1] To generate ENCRYPTED rsa private key(private.pem): `openssl genrsa -des3 -out private.pem`

2] To generate rsa public key(public.pem): openssl rsa -in private.pem -outform PEM -pubout -out public.pem

3] To decrypt the private.pem:  `openssl rsa -in private.pem -out decrypted_private.pem`

