/**
 * Test Stripe Webhook Endpoint
 * 
 * Usage:
 *   node scripts/test-webhook.js
 * 
 * This script tests the Stripe webhook endpoint with a mock event
 */

const https = require('https');
const http = require('http');

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://www.zbktransportservices.com/api/stripe/webhook';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'whsec_T4w5S2Jn2MFdSdnpL8hApi6kFwqVFyEj';

// Mock checkout.session.completed event
const mockEvent = {
  id: 'evt_test_webhook',
  object: 'event',
  api_version: '2025-11-17.clover',
  created: Math.floor(Date.now() / 1000),
  data: {
    object: {
      id: 'cs_test_123',
      object: 'checkout.session',
      payment_status: 'paid',
      status: 'complete',
      amount_total: 10000,
      currency: 'usd',
      customer_email: 'test@example.com',
      payment_intent: 'pi_test_123',
      metadata: {
        bookingId: 'test_booking_123'
      }
    }
  },
  livemode: false,
  pending_webhooks: 1,
  request: {
    id: 'req_test_123',
    idempotency_key: null
  },
  type: 'checkout.session.completed'
};

// Create signature (simplified - in real Stripe, this is more complex)
// For testing, we'll send without signature verification or use a test signature
function createTestSignature(timestamp, payload, secret) {
  const crypto = require('crypto');
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  return `t=${timestamp},v1=${signature}`;
}

async function testWebhook() {
  console.log('🧪 Testing Stripe Webhook Endpoint');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📍 URL:', WEBHOOK_URL);
  console.log('🔑 Secret:', WEBHOOK_SECRET.substring(0, 10) + '...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const payload = JSON.stringify(mockEvent);
  const timestamp = Math.floor(Date.now() / 1000);
  
  // Note: For real testing, you should use Stripe CLI to generate proper signatures
  // This is a simplified test that may fail signature verification
  const signature = createTestSignature(timestamp, payload, WEBHOOK_SECRET);

  const url = new URL(WEBHOOK_URL);
  const isHttps = url.protocol === 'https:';
  const client = isHttps ? https : http;

  const options = {
    hostname: url.hostname,
    port: url.port || (isHttps ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
      'stripe-signature': signature,
      'User-Agent': 'Stripe-Webhook-Test/1.0'
    }
  };

  return new Promise((resolve, reject) => {
    console.log('📤 Sending test webhook event...');
    console.log('   Event Type:', mockEvent.type);
    console.log('   Booking ID:', mockEvent.data.object.metadata.bookingId);
    console.log('');

    const req = client.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('📥 Response received:');
        console.log('   Status:', res.statusCode, res.statusMessage);
        console.log('   Headers:', JSON.stringify(res.headers, null, 2));
        console.log('   Body:', data);
        console.log('');

        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Webhook test successful!');
          resolve({ success: true, status: res.statusCode, data });
        } else {
          console.log('⚠️  Webhook test returned non-2xx status');
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

// Run test
testWebhook()
  .then((result) => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Test completed:', result.success ? '✅ SUCCESS' : '⚠️  WARNING');
    process.exit(result.success ? 0 : 1);
  })
  .catch((error) => {
    console.error('❌ Test failed:', error);
    process.exit(1);
  });

