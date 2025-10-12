#!/usr/bin/env node

/**
 * Quick verification script to check environment setup
 * Run this after creating .env.local
 */

console.log('\n🔍 Verifying WANAC Platform Setup...\n');

// Check if .env.local exists
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Please create .env.local in project root with:');
  console.log('   NEXT_PUBLIC_API_URL=https://wanac-api.kuzasports.com');
  console.log('   NEXT_PUBLIC_OPENAI_API_KEY=sk-proj-your-key');
  console.log('   NEXT_PUBLIC_JITSI_DOMAIN=meet.jit.si\n');
  process.exit(1);
}

console.log('✅ .env.local file found\n');

// Read and check environment variables from file
const envContent = fs.readFileSync(envPath, 'utf8');

const checks = [
  {
    name: 'WANAC API URL',
    key: 'NEXT_PUBLIC_API_URL',
    pattern: /NEXT_PUBLIC_API_URL=(.+)/,
    expected: 'https://wanac-api.kuzasports.com',
  },
  {
    name: 'OpenAI API Key',
    key: 'NEXT_PUBLIC_OPENAI_API_KEY',
    pattern: /NEXT_PUBLIC_OPENAI_API_KEY=(.+)/,
    validator: (val) => val && (val.startsWith('sk-proj-') || val.startsWith('sk-')),
    errorMsg: 'Should start with sk-proj- or sk-',
  },
  {
    name: 'Jitsi Domain',
    key: 'NEXT_PUBLIC_JITSI_DOMAIN',
    pattern: /NEXT_PUBLIC_JITSI_DOMAIN=(.+)/,
    expected: 'meet.jit.si',
  },
];

let allPassed = true;

checks.forEach((check) => {
  const match = envContent.match(check.pattern);
  const value = match ? match[1].trim() : null;
  
  if (!value) {
    console.log(`❌ ${check.name}: NOT SET`);
    console.log(`   Add to .env.local: ${check.key}=...`);
    allPassed = false;
  } else if (check.validator) {
    if (check.validator(value)) {
      console.log(`✅ ${check.name}: Valid (${value.substring(0, 15)}...)`);
    } else {
      console.log(`❌ ${check.name}: Invalid`);
      console.log(`   ${check.errorMsg}`);
      allPassed = false;
    }
  } else if (check.expected && value !== check.expected) {
    console.log(`⚠️  ${check.name}: ${value}`);
    console.log(`   Expected: ${check.expected}`);
  } else {
    console.log(`✅ ${check.name}: ${value}`);
  }
});

console.log('\n' + '='.repeat(50) + '\n');

if (allPassed) {
  console.log('✅ All environment variables configured!');
  console.log('\n📋 Next steps:');
  console.log('   1. Restart your dev server: npm run dev');
  console.log('   2. Navigate to a fireteam experience');
  console.log('   3. Test the meeting functionality\n');
} else {
  console.log('❌ Some checks failed!');
  console.log('   Please fix the issues in .env.local and run this script again.\n');
  process.exit(1);
}

// Check for required files
console.log('📁 Checking required files...\n');

const requiredFiles = [
  'src/services/api/meeting.service.ts',
  'src/services/api/openai.service.ts',
  'src/services/api/fireteam.service.ts',
  'src/services/api/config.ts',
  'src/app/client/fireteam/experience/hooks/useRecording.js',
  'src/app/client/fireteam/experience/hooks/useJitsiMeeting.js',
];

let allFilesExist = true;

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

console.log('\n✅ All required files present!');
console.log('\n🎉 Setup verification complete!\n');

