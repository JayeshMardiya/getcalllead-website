import { execSync } from 'node:child_process';
import https from 'node:https';
import tls from 'node:tls';

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', timeout: 10000 }).trim();
  } catch (err) {
    return `Error: ${err.message}`;
  }
}

async function checkTls(host) {
  return new Promise((resolve) => {
    const socket = tls.connect(443, host, { servername: host }, () => {
      const cert = socket.getPeerCertificate();
      socket.end();
      resolve({
        subject: cert.subject,
        issuer: cert.issuer,
        validFrom: cert.valid_from,
        validTo: cert.valid_to,
        sans: cert.subjectaltname,
      });
    });
    socket.on('error', (err) => resolve({ error: err.message }));
    socket.setTimeout(8000, () => {
      socket.destroy();
      resolve({ error: 'Timeout' });
    });
  });
}

function checkRedirectChain(url) {
  return run(`curl -sIL -o /dev/null -w "%{url_effective} (Status: %{http_code}, Redirects: %{num_redirects})\n" "${url}"`);
}

async function main() {
  console.log('======================================================================');
  console.log('GETCALLLEAD AUTHORITATIVE READ-ONLY DNS & TLS AUDIT');
  console.log('UTC Timestamp:', new Date().toISOString());
  console.log('======================================================================\n');

  console.log('1. NAMESERVERS (NS):');
  console.log(run('dig NS getcalllead.io +short'));

  console.log('\n2. APEX A & AAAA:');
  console.log('A:   ', run('dig A getcalllead.io +short'));
  console.log('AAAA:', run('dig AAAA getcalllead.io +short') || 'None');

  console.log('\n3. WWW A & CNAME:');
  console.log('A:    ', run('dig A www.getcalllead.io +short') || 'None');
  console.log('CNAME:', run('dig CNAME www.getcalllead.io +short') || 'None');

  console.log('\n4. RESOLVER COMPARISON (Apex A):');
  console.log('Google (8.8.8.8):    ', run('dig @8.8.8.8 A getcalllead.io +short'));
  console.log('Cloudflare (1.1.1.1):', run('dig @1.1.1.1 A getcalllead.io +short'));
  console.log('Quad9 (9.9.9.9):     ', run('dig @9.9.9.9 A getcalllead.io +short'));

  console.log('\n5. DNSSEC & CAA:');
  console.log('DNSSEC (DS):', run('dig DS getcalllead.io +short') || 'None configured');
  console.log('CAA:        ', run('dig CAA getcalllead.io +short') || 'None configured');

  console.log('\n6. REDIRECT CHAINS:');
  console.log('HTTP Apex (http://getcalllead.io):     ', checkRedirectChain('http://getcalllead.io'));
  console.log('HTTPS Apex (https://getcalllead.io):   ', checkRedirectChain('https://getcalllead.io'));
  console.log('HTTP WWW (http://www.getcalllead.io):  ', checkRedirectChain('http://www.getcalllead.io'));
  console.log('HTTPS WWW (https://www.getcalllead.io):', checkRedirectChain('https://www.getcalllead.io'));

  console.log('\n7. TLS CERTIFICATE DETAILS (https://getcalllead.io):');
  const tlsInfo = await checkTls('getcalllead.io');
  console.log(JSON.stringify(tlsInfo, null, 2));

  console.log('\n8. CRAWL CONFIGURATION:');
  console.log('robots.txt status:', run('curl -s -o /dev/null -w "%{http_code}" https://getcalllead.io/robots.txt'));
  console.log('sitemap.xml status:', run('curl -s -o /dev/null -w "%{http_code}" https://getcalllead.io/sitemap.xml'));
}

main().catch(console.error);
