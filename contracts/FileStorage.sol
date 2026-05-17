// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {

    struct File {
        string ipfsHash;
        address owner;
    }

    File[] public files;

    function uploadFile(string memory _hash) public {
        files.push(File(_hash, msg.sender));
    }

    function getFile(uint index) public view returns(string memory, address){
        return (files[index].ipfsHash, files[index].owner);
    }

    function getCount() public view returns(uint){
        return files.length;
    }
}