'use strict';

const FILE_TYPES = [`png`, `jpeg`, `jpg`];

let avatarChooser = document.querySelector(`.ad-form__field input[type=file]`);
let avatar = document.querySelector(`.ad-form-header__preview img`);
let fotoChooser = document.querySelector(`.ad-form__upload input[type=file]`);
let foto = document.querySelector(`.ad-form__photo`);
let reader;

avatarChooser.addEventListener(`change`, function () {
  let file = avatarChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (type) {
    return fileName.endsWith(type);
  });

  if (matches) {
    reader = new FileReader();

    reader.addEventListener(`load`, function () {
      avatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fotoChooser.addEventListener(`change`, function () {
  let file = fotoChooser.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (type) {
    return fileName.endsWith(type);
  });

  if (matches) {
    reader = new FileReader();

    reader.addEventListener(`load`, function () {
      foto.style.backgroundImage = `url(${reader.result})`;
    });

    reader.readAsDataURL(file);
  }
});
