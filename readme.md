# OpenFund

**OpenFund** is an open accounting system backed by Ethereum blockchain created by Manojna Vinjamuri, and Susmit Singh (Team Sumo) for Woman Techies 22 hackathon.

With OpenFund, we plan to revolutionise and reimagine how crowd sourcing happens.

OpenFund is powered by Etherium Blockchain.

⚠️**Please go through OPENFUND_Explanation.pdf for better understanding of our project**⚠️

## Creaters
1. Manojna Vinjamuri - (Ethereum Folder) Solidity 
2. Susmit Singh - Frontend

## Installation

☠️⚠️ **THIS PROJECT IS UNSTABLE AND IN ACTIVE DEVELOPMENT, SOME PARTS OF THE APPLICATIONS ARE INCOMPLETE.** ⚠️☠️

### **Steps**

1. Clone the repository
```bash
git clone git@github.com:Pumpkinchaat/OpenFund.git
```
2. Download the dependencies using npm](https://nodejs.org/en/download/)
```bash
npm install
```
3. Create the __next.config.js__ file and save your credentials in it 
```bash
ACCOUNT_SECRET="random random random random random random random random random random random random"
ETH_NODE_LINK="https://rinkeby.infura.io/v3/randomxxx123linkxx123random"
FACTORY_ADDR="0x12345678899012345678random"
```
4. Open command line and type
```bash
npm run build
npm run start
```

## Usage
1. The first screen will show all the ongoing campaigns. (No current campaign is running)
![image](https://user-images.githubusercontent.com/70791580/178148485-9e245e6b-6d96-4ea0-a33c-130b09cac08e.png)

2. User can create a new Campaign
![image](https://user-images.githubusercontent.com/70791580/178148584-72b023fd-7164-4729-a988-64eaeb3ac0fb.png)

3. After creation the campaign will be added to the main page
![image](https://user-images.githubusercontent.com/70791580/178148592-a1d4e039-5e57-47f1-9984-fd0a56a3a4ca.png)

4. When the page of a campaign will be opened, the page will show the campaign details and will provide the donation form.
![image](https://user-images.githubusercontent.com/70791580/178148673-13b2f0e0-6632-4d94-a80f-76ddd11c38f0.png)
![image](https://user-images.githubusercontent.com/70791580/178148677-890e4a25-d68b-434c-9138-b0337874759f.png)
![image](https://user-images.githubusercontent.com/70791580/178148690-9975e16a-d38c-4e4b-95a4-e27c9ff965a1.png)

5. Any user can donate, but only the MANAGER of the campaign will be able to create an expenditure request
![image](https://user-images.githubusercontent.com/70791580/178148735-691dfc21-6e0c-4ee7-8efc-d62572a15c1d.png)

6. All the equity contibutors will be able to vote on that expenditure, and once  more than 50% votes have been registered, the manager will be able to finalize the transaction
![image](https://user-images.githubusercontent.com/70791580/178148785-85821c05-01f8-43d0-bc6e-ffac9a244994.png)
![image](https://user-images.githubusercontent.com/70791580/178148788-b975feaf-deeb-4128-beff-82acc61ccedf.png)

7. A record of all the transactions can also be seen
![image](https://user-images.githubusercontent.com/70791580/178148802-de358a1d-b473-46d2-b294-eb01dd4e9752.png)

8. The manager, after the balance of the smart contract (campaign) has reached 0, will be able to delete the campaign
![image](https://user-images.githubusercontent.com/70791580/178148832-943382ce-ed44-4c3f-8298-05b301a679b0.png)
![image](https://user-images.githubusercontent.com/70791580/178148834-ae03f6a2-298b-4742-b0c5-3c4f091b80af.png)



### Credits
Manojna Vinjamuri (https://github.com/manojna191)
Susmit Singh (https://github.com/Pumpkinchaat)
