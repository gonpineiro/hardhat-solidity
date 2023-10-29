Existen diversos entornos de desarrollo que puedes utilizar para el desarrollo de contratos inteligentes. Posiblemente, el más popular por estos días en la comunidad de Ethereum, es Hardhat.

### Desarrollo y despliegue de contratos con Hardhat
Hardhat es un entorno de desarrollo que nos permitirá trabajar durante todo el ciclo de vida de un smart contract en redes basadas en EVM. Desde la configuración del entorno, el desarrollo del contrato, las pruebas del mismo, depuración, compilación, hasta llegar a la etapa del despliegue en la blockchain.

Hardhat está basado en Javascript, por lo que todo tu conocimiento previo en el lenguaje y en tecnologías como NPM te será de gran ayuda para desarrollar cualquier proyecto.

### Instalación de Hardhat
El primer paso para utilizar Hardhat es la instalación del framework en tu computador. Para esto, deberás crear un nuevo proyecto con ayuda de NPM e instalar Hardhat como dependencia.

`npm init -y npm install hardhat npm install @nomicfoundation/hardhat-toolbox`

Recuerda que deberás tener listo tu entorno de desarrollo basado en NodeJS en tu computador para utilizar NPM. Si bien los contratos se desarrollan con Solidity, necesitarás la ayuda de Javascript para crear, testear y desplegar tu contrato.

### Creación y configuración de un proyecto con Hardhat
Cuando dispongas de tu proyecto base creado con npm, el comando npx hardhat iniciará dentro de este un nuevo proyecto con las configuraciones base de Hardhat.

Verás un nuevo archivo llamado hardhat.config.js, el cual modificaremos posteriormente para el despliegue del contrato en la blockchain.

Con Hardhat inicializado, es momento de crear tu primer contrato con este framework. Para esto, crea un directorio llamado contracts con el archivo .sol que conforma tu contrato inteligente. Para el siguiente contrato, el archivo se llama Counter.sol:

```js 
// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.8.1 <0.8.19;
contract Counter { 
    uint counter;

    constructor(uint _counter) {
        counter = _counter;
    }

    function getCounter() public view returns (uint) {
        return counter;
    }

    function increment() public {
        counter++;
    }
}
```

### Desarrollo de pruebas unitarias en Hardhat
Una de las partes esenciales del desarrollo de smart contract son sus pruebas unitarias. Tener un buen set de pruebas para asegurar el buen funcionamiento de tu contrato es fundamental.

Dentro de tu proyecto, crea un directorio llamado test con un archivo llamado counter.js donde escribiremos las pruebas del contrato Counter.sol. Haremos uso de la librería ether.js, que ya viene integrada dentro de Hardhat. También necesitarás instalar Chai que utilizaremos para evaluar los resultados de las pruebas.

```js
const { expect } = require('chai') 
const { ethers } = require('hardhat')

describe('Counter Contract', () => { 
    it('Should increment the counter', 
    async () => { 
        const Counter = await ethers.getContractFactory('Counter') 
        const counter = await Counter.deploy(0) 
        await counter.increment() 
        const updateCounter = await counter.getCounter()
        expect(updateCounter).to.equal(1)
    })
})
```

En estas líneas de código de la prueba, escrita con Javascript, estamos creando una prueba unitaria que en primer lugar captura el contrato Counter.sol. Instancia el mismo y ejecutar la función increment(). Luego, capturamos el valor actual del contador y corroboramos que el mismo sea de uno.

Finalmente, con el comando npx hardhat test, ejecutarás las pruebas y verás los resultados por consola. De esta forma, ya puedes probar la lógica de tu contrato, sin necesidad de desplegar en mismo en la blockchain y sin comisiones.

### Preparación para el despliegue del contrato
Cuando estés seguro de que tu contrato está finalizado, con un buen set de pruebas que demuestre su correcto funcionamiento, es momento de automatizar el despliegue del mismo con Hardhat.

Comienza creando un directorio llamado scripts con un archivo llamado deploy.js. Aquí escribiremos, también utilizando Javascript, un script que automatiza el despliegue del contrato en la blockchain.

```js
const { ethers } = require("hardhat");

async function main(){ 
    const [deployer] = await ethers.getSigner(); 
    console.log("Deployer",deployer);

    const Counter = await ethers.getContractFactory('Counter');
    const counter = await Counter.deploy(0);

    console.log ("Counter Contract Addres",counter.address);
} 

main()
    .then(() => process.exit(0))
    .catch( (error) => { 
        console.error(error); process.exit(1); 
    }); 
```

Es momento de retomar la configuración del hardhat.config.js. Aquí, configuraremos la red de Ethereum a la cual queremos desplegar el contrato, junto con la información necesaria para esto.

```js
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
};

```

Para este ejemplo, desplegaremos el contrato en Goerli. Hardhat te permitirá desplegar contratos en Sepolia o cualquier otra red basada en EVM.

Observa que necesitarás dos datos muy importantes y delicados, la clave privada de tu wallet que pagará por la comisión del despliegue del contrato. Asegúrate de tener fondos suficientes, en este caso, en Goerli. También necesitarás una URL que apunte a un nodo de Ethereum.

Metamask te permitirá fácilmente exportar la clave privada, no está de más mencionar una vez más la importancia de segurizar bien esta información. Por otro lado, como es todo un reto levantar tu propio nodo de Ethereum, servicios como Infura o Alchemy te otorgarán una URL para conectarse a sus nodos rápidamente.

Si ya tienes todo configurado correctamente, el siguiente paso será el despliegue del contrato. Pero eso lo veremos en la siguiente clase.

### Conclusión
Has visto a lo largo de esta clase lo importante y útil que es trabajar con entornos de desarrollo como Hardhat. Hemos podido desarrollar un contrato, probarlo y tener todo listo para su posterior despliegue. También habrás observado la importancia de Javascript, aunque realmente no necesitas mucho conocimiento en el lenguaje, solo conocer lo básico.