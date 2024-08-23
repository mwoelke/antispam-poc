// worker.js

self.onmessage = async function(e) {
    importScripts('/dist/bundle.js');
    const { challenge, time, memory, hashLength, difficulty } = e.data;

    //calculate target
    const target = Math.floor((2 ** 32 - 1) / difficulty);
    //console.log(challenge, time, memory, hashLength, difficulty, target);

    try {
        let nonce = 1000000000;
        let hash = '';
        let startTime = performance.now();

        while (true) {
            const argon2Hash = await argon2.hash({
                pass: challenge,
                salt: nonce.toString(),
                time: time,
                mem: memory,
                hashLen: hashLength,
                type: argon2.ArgonType.Argon2id 
            });
            hash = argon2Hash.hashHex;
            //console.log(target.toString(16).padStart(8,'0'));

            //check if hash matches target
            if(parseInt(hash.slice(0, 8), 16) <= target) {
                let endTime = performance.now();
                self.postMessage({
                    argon2Hash: argon2Hash, 
                    nonce: nonce, 
                    timeTaken: endTime - startTime,
                    memory: memory,
                    time: time,
                    difficulty: difficulty,
                    target: target.toString(16).padStart(8, '0')
                });
                break;
            }
            nonce++;
        }
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};