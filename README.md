This is a proof-of-concept for an anti-spam solution for web forms, created for my bachelor's thesis.

The solution integrates two primary components: Argon2-based Proof of Work (PoW) and a Honeypot Field. The PoW mechanism's difficulty level is dynamically adjusted based on the client's IP address, which is cross-referenced with multiple real-time blocklists. With each subsequent request from the same IP, the difficulty of the PoW challenge increases.

# Setup

A docker container is provided. The container will pull all necessary dependencies and initiate an HTTP server on port 8080:

```
docker compose up
```

# Shoutouts

This work utilizes the following libraries:

https://github.com/antelle/argon2-browser - Underlying Argon2 WASM library

https://github.com/GoogleChromeLabs/wasm-feature-detect - Detect SIMD support at runtime 

https://github.com/firebase/php-jwt - JWT library for PHP