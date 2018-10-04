const bcrypt = require('bcrypt')

// hashing we need source -- random charts added before or end to the password
// 1234 ==> abcd

const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

async function run() {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash('1234', salt)
  
  const valid = await bcrypt.compare('1234', hashed)
  console.log(valid)
  console.log('salt', salt)
  console.log('hashed', hashed)
}

run()
