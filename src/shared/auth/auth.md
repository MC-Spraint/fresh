$$ There are 6 envs used accross the module,
1] PRIVATE_KEY
2] PUBLIC_KEY
3] ACCESS_TOKEN_SECRET
4] ACCESS_TOKEN_EXPIRATION
5] REFRESH_TOKEN_SECRET
6] REFRESH_TOKEN_EXPIRATION
 **each one of them has a purpose
 $$

For example PRIVATE_KEY signs the tokens and
PUBLIC_KEY validate them, PRIVAtE_KEY can also
validate them but It's important to keep the 
PRIVAtE_KEY secure, and the PUBLIC_KEY can be 
shared to anyone who needs to validate the token

`We used RS256 algorithm to sign and validate tokens`

## [Concept Of Refresh Token]
__________________________

We sign the refresh token to perform a hash on it and save
it in the db(hash),
When the access token expires then refresh token comes into 
picture to genrate a new access token, 
We perform the operation by validating the access token, if its successful
then we look for the hash of refresh token in the database and the 
refresh token provided through the api call and compare them.
if it returns true we sign the user a new access token as well as 
the current refresh token but don't modifyit in the database.

We only modify the refresh token that is saved in the database 
only if the access token is expired, in which case user needs 
to login again, and we will sign him a new pair of refresh and access token
