pragma solidity ^0.4.24;

contract lovePass {

    struct ngo {
        string name;
        string intr;
        bytes32 passHash;
        string[] doNaList;
        mapping (string => address) doList;
    }

    struct per {
        string name;
        bytes32 passHash;
    }

	mapping (address => ngo) public ngolist;
	mapping (address => per) public perlist;

	event createNgo(string ngo, address addr);
	event createPer(string ngo, address addr);
	event addDona(address ng, string eventna, address addr);

    // -----------------------------------------------------------------------

	function crNgo(string nam, string pass, string intr, address ad) internal {
	    string[] memory tmp = new string[](1);
        tmp[0] = " ";
	    ngo memory tmpNgo = ngo(nam, intr, sha256(abi.encodePacked(pass)), tmp);
	    ngolist[ad] = tmpNgo;
		emit createNgo(nam, ad);
	}

	function ngoAddDona(address ng, string name, address donaAd) internal {
	    ngolist[ng].doList[name] = donaAd;
	    ngolist[ng].doNaList.push(name);
	    emit addDona(ng, name, donaAd);
	}

	function reDoNaList(address ng) internal view returns (string[]) {
	    return ngolist[ng].doNaList;
	}

	function reDoAdList(address ng, string na) internal view returns (address){
	    return ngolist[ng].doList[na];
	}

	// -------------------------------------------------------------------------

	function crPer(string nam, string pass, address ad) internal {
	    per memory tmpPer = per(nam, sha256(abi.encodePacked(pass)));
	    perlist[ad] = tmpPer;
	    emit createPer(nam, ad);
	}

}
