package main

import (
	"crypto/ecdsa"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"

	"github.com/coindex/coindex-keypair/keypair"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
)

func generateKeyPair() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	privateKey, err := crypto.GenerateKey()
	if err != nil {
		log.Fatal(err)
	}

	privateKeyBytes := crypto.FromECDSA(privateKey)

	fmt.Println(hexutil.Encode(privateKeyBytes)[2:])

	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("error casting public key to ECDSA")
	}

	publicKeyBytes := crypto.FromECDSAPub(publicKeyECDSA)
	pubk := hexutil.Encode(publicKeyBytes)[66:]

	pubhex, _ := hex.DecodeString(pubk)
	fmt.Println(len(pubhex))

	return hexutil.Encode(publicKeyBytes)[62:], nil
}

func main() {
	//generateKeyPair()
	keypair.Secp256k1()
	// app := app.New()

	// keypair.Show(app)
	// app.Run()
}
