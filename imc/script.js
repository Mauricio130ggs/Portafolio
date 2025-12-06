function calc_imc() {
            let peso = parseFloat(document.getElementById('peso').value);
            let altura = parseFloat(document.getElementById('altura').value);
            
            if (isNaN(peso) || isNaN(altura) || !peso || !altura || peso <= 0 || altura <= 0) {
                alert('Por favor ingrese valores válidos');
                return;
            }

            let imc = peso / (altura ** 2);
            let resultado_text = document.getElementById('result');
            let body = document.body;
            let bodyImage = document.getElementById('bodyImage');

            body.classList.remove('c1', 'c2', 'c3', 'c4', 'c5', 'c6');

            if (imc < 18.5) {
                body.classList.add('c1');
                resultado_text.textContent = "Peso Bajo - IMC: " + imc.toFixed(2);
                bodyImage.style.display = 'block';
                bodyImage.src = "img/infrapeso.png";
            }
            else if (imc >= 18.5 && imc <= 24.9) {
                body.classList.add('c2');
                resultado_text.textContent = "Peso Normal - IMC: " + imc.toFixed(2);
                bodyImage.style.display = 'block';
                bodyImage.src = "img/normal.png";
            }
            else if (imc >= 25 && imc <= 29.9) {
                body.classList.add('c3');
                resultado_text.textContent = "Sobrepeso - IMC: " + imc.toFixed(2);
                bodyImage.style.display = 'block';
                bodyImage.src = "img/obesidad.png";
            }
            else if (imc >= 30 && imc <= 34.9) {
                body.classList.add('c4');
                resultado_text.textContent = "Obesidad Leve - IMC: " + imc.toFixed(2);
                bodyImage.style.display = 'block';
                bodyImage.src = "img/obesidadM.png";
            }
            else if (imc >= 35 && imc <= 39.9) {
                body.classList.add('c5');
                resultado_text.textContent = "Obesidad Media - IMC: " + imc.toFixed(2);
                bodyImage.style.display = 'block';
                bodyImage.src = "img/sobrepeso.png";
            }
            else {
                body.classList.add('c6');
                resultado_text.textContent = "Obesidad Mórbida - IMC: " + imc.toFixed(2);
                bodyImage.style.display = 'block';
            }
        }