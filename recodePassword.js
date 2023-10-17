const bcrypt = require('bcrypt');

const password = 'P@ssword123'; // Le mot de passe que vous souhaitez hacher

// Générez un sel (salt) pour le hachage
bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;

  // Utilisez le sel pour hacher le mot de passe
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;

    // Affichez le mot de passe haché
    console.log('Mot de passe haché :', hash);
  });
});
