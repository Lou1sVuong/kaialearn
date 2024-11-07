export const puzzles = [
  {
    id: 1,
    title: "Game1",
    description:
      "Set isWon to true by calling the win function with the correct parameters",
    difficulty: 1,
    contract: `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.17;
  
  contract Game1 {
      bool public isWon;
      
      function win(uint256 number) public {
          require(number == 42, "wrong number");
          isWon = true;
      }
  }`,
    testTemplate: `describe("Game1", function() {
      it("should be possible to win", async function() {
          const game = await ethers.getContractFactory("Game1");
          const contract = await game.deploy();
          await contract.deployed();
          
          // Write your solution here
          
          const isWon = await contract.isWon();
          expect(isWon).to.be.true;
      });
  });`,
    hint: "Look at the win function's requirement. What number does it expect?",
    solution: `await contract.win(42);`,
  },
  {
    id: 2,
    title: "Game2",
    description:
      "Set isWon to true by calling the win function at the right time",
    difficulty: 2,
    contract: `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.17;
  
  contract Game2 {
      bool public isWon;
      
      function win() public {
          require(block.number % 2 == 0, "wrong block");
          isWon = true;
      }
  }`,
    testTemplate: `describe("Game2", function() {
      it("should be possible to win", async function() {
          const game = await ethers.getContractFactory("Game2");
          const contract = await game.deploy();
          await contract.deployed();
          
          // Write your solution here
          
          const isWon = await contract.isWon();
          expect(isWon).to.be.true;
      });
  });`,
    hint: "The win function checks if the block number is even. How can you manipulate the block number in your test?",
    solution: `await ethers.provider.send("evm_mine", []);
  await contract.win();`,
  },
  {
    id: 3,
    title: "Game3",
    description: "Set isWon to true by guessing the correct number",
    difficulty: 3,
    contract: `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.17;
  
  contract Game3 {
      bool public isWon;
      uint256 private secretNumber;
  
      constructor() {
          secretNumber = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 1000000;
      }
      
      function guess(uint256 _guess) public {
          require(_guess == secretNumber, "Wrong number");
          isWon = true;
      }
  }`,
    testTemplate: `describe("Game3", function() {
      it("should be possible to win", async function() {
          const game = await ethers.getContractFactory("Game3");
          const contract = await game.deploy();
          await contract.deployed();
          
          // Write your solution here
          
          const isWon = await contract.isWon();
          expect(isWon).to.be.true;
      });
  });`,
    hint: "You need to find a way to predict or extract the secret number. Think about how the contract generates it.",
    solution: `const secretNumber = await ethers.provider.getStorageAt(contract.address, 1);
  await contract.guess(secretNumber);`,
  },
  {
    id: 4,
    title: "Game4",
    description: "Set isWon to true by exploiting the overflow vulnerability",
    difficulty: 4,
    contract: `// SPDX-License-Identifier: MIT
  pragma solidity ^0.7.6;
  
  contract Game4 {
      bool public isWon;
      uint8 private sum;
      
      function add(uint8 _num) public {
          sum += _num;
      }
      
      function win() public {
          require(sum == 0, "Sum is not 0");
          isWon = true;
      }
  }`,
    testTemplate: `describe("Game4", function() {
      it("should be possible to win", async function() {
          const game = await ethers.getContractFactory("Game4");
          const contract = await game.deploy();
          await contract.deployed();
          
          // Write your solution here
          
          const isWon = await contract.isWon();
          expect(isWon).to.be.true;
      });
  });`,
    hint: "This contract uses an older Solidity version. Think about how uint8 behaves when it overflows.",
    solution: `await contract.add(255);
  await contract.add(1);
  await contract.win();`,
  },
  {
    id: 5,
    title: "Game5",
    description:
      "Set isWon to true by exploiting the contract's initialization",
    difficulty: 5,
    contract: `// SPDX-License-Identifier: MIT
  pragma solidity ^0.8.17;
  
  contract Game5 {
      bool public isWon;
      address private owner;
      
      function initialize(address _owner) public {
          require(owner == address(0), "Already initialized");
          owner = _owner;
      }
      
      function win() public {
          require(msg.sender == owner, "Not the owner");
          isWon = true;
      }
  }`,
    testTemplate: `describe("Game5", function() {
      it("should be possible to win", async function() {
          const game = await ethers.getContractFactory("Game5");
          const contract = await game.deploy();
          await contract.deployed();
          
          // Write your solution here
          
          const isWon = await contract.isWon();
          expect(isWon).to.be.true;
      });
  });`,
    hint: "Look at the initialize function. Is there any way you can become the owner?",
    solution: `await contract.initialize(await ethers.provider.getSigner().getAddress());
  await contract.win();`,
  },
];
