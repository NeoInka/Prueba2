document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const toggleModeBtn = document.getElementById('toggleMode');
    const changeLanguageBtn = document.getElementById('changeLanguage');
    const explainVariablesBtn = document.getElementById('explainVariables');
    const resultDiv = document.getElementById('result');
    const conclusionDiv = document.getElementById('conclusion');
    const plotDiv = document.getElementById('plot');
    let darkMode = true;
    let language = 'es';

    const variablesExplanation = {
        es: {
            E: "Módulo de Elasticidad: Representa la rigidez del material.",
            I: "Momento de Inercia: Indica cómo se distribuye el área en la sección transversal.",
            K: "Factor de Longitud Efectiva: Considera cómo está soportada la columna.",
            L: "Longitud: Longitud efectiva de la columna."
        },
        en: {
            E: "Modulus of Elasticity: Represents the stiffness of the material.",
            I: "Moment of Inertia: Indicates how the area is distributed in the cross-section.",
            K: "Effective Length Factor: Considers how the column is supported.",
            L: "Length: Effective length of the column."
        },
        ay: {
            E: "Ch'ama ch'uxña mä lak'a uñjama: jupanakasirinakas ukhamaru markatayna ch'ama.",
            I: "Ch'ama ch'uxña mä uñjama: jupanakasirinakas ukhamaru qillqatanaka.",
            K: "Qillqatanaka kimsa janiwawa ch'ama kimsa.",
            L: "Ch'ama janiwa: jupanakasirinakas uñjama ch'ama kimsa."
        },
        qu: {
            E: "Ch'ama ch'uxña mä uñjama: jupanakasirinakas qhipa sutichaña ch'ama.",
            I: "Ch'ama ch'uxña mä uñjama: jupanakasirinakas qhipa qillqatanaka.",
            K: "Qillqatanaka qhipa janiwawa ch'ama kimsa.",
            L: "Ch'ama janiwa: jupanakasirinakas qhipa ch'ama kimsa."
        }
    };

    function calculate() {
        const E = parseFloat(document.getElementById('E').value);
        const I = parseFloat(document.getElementById('I').value);
        const K = parseFloat(document.getElementById('K').value);
        const L = parseFloat(document.getElementById('L').value);

        if (isNaN(E) || isNaN(I) || isNaN(K) || isNaN(L)) {
            resultDiv.textContent = "Por favor, ingrese valores válidos en todos los campos.";
            return;
        }

        const Pcr = (Math.PI ** 2 * E * I) / ((K * L) ** 2);
        resultDiv.textContent = `Carga Crítica Máxima (Pcr): ${Pcr.toFixed(2)}`;

        plotGraph(E, I, K, L, Pcr);
        conclude(E, I, K, L, Pcr);
    }

    function reset() {
        document.getElementById('E').value = '';
        document.getElementById('I').value = '';
        document.getElementById('K').value = '';
        document.getElementById('L').value = '';
        resultDiv.textContent = '';
        conclusionDiv.textContent = '';
        Plotly.purge(plotDiv);
    }

    function toggleMode() {
        darkMode = !darkMode;
        document.body.classList.toggle('light-mode', !darkMode);
    }

    function changeLanguage() {
        const languages = ['es', 'en', 'ay', 'qu'];
        const currentIndex = languages.indexOf(language);
        language = languages[(currentIndex + 1) % languages.length];
        updateLanguage();
    }

    function updateLanguage() {
        const labels = {
            es: {
                title: "Calculadora de Carga Crítica Máxima",
                E: "E (Módulo de Elasticidad):",
                I: "I (Momento de Inercia):",
                K: "K (Factor de Longitud Efectiva):",
                L: "L (Longitud):",
                calculate: "Calcular",
                reset: "Restablecer",
                toggleMode: "Modo Oscuro/Claro",
                changeLanguage: "Cambiar Idioma",
                explainVariables: "Explicar Variables"
            },
            en: {
                title: "Maximum Critical Load Calculator",
                E: "E (Modulus of Elasticity):",
                I: "I (Moment of Inertia):",
                K: "K (Effective Length Factor):",
                L: "L (Length):",
                calculate: "Calculate",
                reset: "Reset",
                toggleMode: "Dark/Light Mode",
                changeLanguage: "Change Language",
                explainVariables: "Explain Variables"
            },
            ay: {
                title: "Má Crítico de Carga Ukhamarak",
                E: "E (Ch'ama Ch'uxña Mä Lak'a Uñjama):",
                I: "I (Ch'ama Ch'uxña Mä Uñjama):",
                K: "K (Qillqatanaka Kimsa Janiwawa Ch'ama Kimsa):",
                L: "L (Ch'ama Janiwa):",
                calculate: "Sutichaña",
                reset: "Qhipaña",
                toggleMode: "Ch'uxña/Mä Janiwawa",
                changeLanguage: "Sutichaña Aru",
                explainVariables: "Qillqatanaka Uñja"
            },
            qu: {
                title: "Má Crítico Carga Ukhamarak",
                E: "E (Ch'ama Ch'uxña Mä Uñjama):",
                I: "I (Ch'ama Ch'uxña Mä Uñjama):",
                K: "K (Qillqatanaka Qhipa Janiwawa Ch'ama Kimsa):",
                L: "L (Ch'ama Janiwa):",
                calculate: "Sutichaña",
                reset: "Qhipaña",
                toggleMode: "Ch'uxña/Mä Janiwawa",
                changeLanguage: "Sutichaña Aru",
                explainVariables: "Qillqatanaka Uñja"
            }
        };

        document.querySelector('h1').textContent = labels[language].title;
        document.querySelector('label[for="E"]').textContent = labels[language].E;
        document.querySelector('label[for="I"]').textContent = labels[language].I;
        document.querySelector('label[for="K"]').textContent = labels[language].K;
        document.querySelector('label[for="L"]').textContent = labels[language].L;
        calculateBtn.textContent = labels[language].calculate;
        resetBtn.textContent = labels[language].reset;
        toggleModeBtn.textContent = labels[language].toggleMode;
        changeLanguageBtn.textContent = labels[language].changeLanguage;
        explainVariablesBtn.textContent = labels[language].explainVariables;
    }

    function explainVariables() {
        alert(
            `E: ${variablesExplanation[language].E}\n` +
            `I: ${variablesExplanation[language].I}\n` +
            `K: ${variablesExplanation[language].K}\n` +
            `L: ${variablesExplanation[language].L}`
        );
    }

    function plotGraph(E, I, K, L, Pcr) {
        const trace = {
            x: ['E', 'I', 'K', 'L'],
            y: [E, I, K, L],
            z: [Pcr, Pcr, Pcr, Pcr],
            mode: 'lines+markers',
            type: 'scatter3d',
            marker: { size: 10 }
        };

        const data = [trace];

        const layout = {
            title: 'Gráfica 3D del Comportamiento de las Variables',
            autosize: true,
            scene: {
                xaxis: { title: 'E' },
                yaxis: { title: 'I' },
                zaxis: { title: 'Pcr' }
            }
        };

        Plotly.newPlot(plotDiv, data, layout);
    }

    function conclude(E, I, K, L, Pcr) {
        conclusionDiv.textContent = `La carga crítica máxima calculada es ${Pcr.toFixed(2)}. Esto significa que bajo las condiciones de rigidez del material (E), momento de inercia (I), factor de longitud efectiva (K) y longitud de la columna (L), esta es la carga máxima que puede soportar antes de que ocurra el pandeo. Si la carga aplicada supera este valor, la columna se deformará y fallará. Es recomendable verificar estos valores y asegurarse de que la columna esté bien soportada para evitar el pandeo.`;
    }

    calculateBtn.addEventListener('click', calculate);
    resetBtn.addEventListener('click', reset);
    toggleModeBtn.addEventListener('click', toggleMode);
    changeLanguageBtn.addEventListener('click', changeLanguage);
    explainVariablesBtn.addEventListener('click', explainVariables);
    updateLanguage(); // Set initial language
});
