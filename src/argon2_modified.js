/**
 * This is a modified version of https://github.com/antelle/argon2-browser 
 * utilizing one LoC from wasm-feature-detect https://github.com/GoogleChromeLabs/wasm-feature-detect
 * 
 * Original licenses:
 * 
 * ----------------------------------------------------------------------------
 * 
 * argon2-browser:
 * 
 * Copyright © 2021 Antelle
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * 
 * ----------------------------------------------------------------------------
 * 
 * wasm-feature-detect:
 * 
 *                                  Apache License
 *                          Version 2.0, January 2004
 *                       http://www.apache.org/licenses/
 *
 *  TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
 *
 *  1. Definitions.
 *
 *     "License" shall mean the terms and conditions for use, reproduction,
 *     and distribution as defined by Sections 1 through 9 of this document.
 *
 *     "Licensor" shall mean the copyright owner or entity authorized by
 *     the copyright owner that is granting the License.
 *
 *     "Legal Entity" shall mean the union of the acting entity and all
 *     other entities that control, are controlled by, or are under common
 *     control with that entity. For the purposes of this definition,
 *     "control" means (i) the power, direct or indirect, to cause the
 *     direction or management of such entity, whether by contract or
 *     otherwise, or (ii) ownership of fifty percent (50%) or more of the
 *     outstanding shares, or (iii) beneficial ownership of such entity.
 *
 *     "You" (or "Your") shall mean an individual or Legal Entity
 *     exercising permissions granted by this License.
 *
 *     "Source" form shall mean the preferred form for making modifications,
 *     including but not limited to software source code, documentation
 *     source, and configuration files.
 *
 *     "Object" form shall mean any form resulting from mechanical
 *     transformation or translation of a Source form, including but
 *     not limited to compiled object code, generated documentation,
 *     and conversions to other media types.
 *
 *     "Work" shall mean the work of authorship, whether in Source or
 *     Object form, made available under the License, as indicated by a
 *     copyright notice that is included in or attached to the work
 *     (an example is provided in the Appendix below).
 *
 *     "Derivative Works" shall mean any work, whether in Source or Object
 *     form, that is based on (or derived from) the Work and for which the
 *     editorial revisions, annotations, elaborations, or other modifications
 *     represent, as a whole, an original work of authorship. For the purposes
 *     of this License, Derivative Works shall not include works that remain
 *     separable from, or merely link (or bind by name) to the interfaces of,
 *     the Work and Derivative Works thereof.
 *
 *     "Contribution" shall mean any work of authorship, including
 *     the original version of the Work and any modifications or additions
 *     to that Work or Derivative Works thereof, that is intentionally
 *     submitted to Licensor for inclusion in the Work by the copyright owner
 *     or by an individual or Legal Entity authorized to submit on behalf of
 *     the copyright owner. For the purposes of this definition, "submitted"
 *     means any form of electronic, verbal, or written communication sent
 *     to the Licensor or its representatives, including but not limited to
 *     communication on electronic mailing lists, source code control systems,
 *     and issue tracking systems that are managed by, or on behalf of, the
 *     Licensor for the purpose of discussing and improving the Work, but
 *     excluding communication that is conspicuously marked or otherwise
 *     designated in writing by the copyright owner as "Not a Contribution."
 *
 *     "Contributor" shall mean Licensor and any individual or Legal Entity
 *     on behalf of whom a Contribution has been received by Licensor and
 *     subsequently incorporated within the Work.
 *
 *  2. Grant of Copyright License. Subject to the terms and conditions of
 *     this License, each Contributor hereby grants to You a perpetual,
 *     worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 *     copyright license to reproduce, prepare Derivative Works of,
 *     publicly display, publicly perform, sublicense, and distribute the
 *     Work and such Derivative Works in Source or Object form.
 *
 *  3. Grant of Patent License. Subject to the terms and conditions of
 *     this License, each Contributor hereby grants to You a perpetual,
 *     worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 *     (except as stated in this section) patent license to make, have made,
 *     use, offer to sell, sell, import, and otherwise transfer the Work,
 *     where such license applies only to those patent claims licensable
 *     by such Contributor that are necessarily infringed by their
 *     Contribution(s) alone or by combination of their Contribution(s)
 *     with the Work to which such Contribution(s) was submitted. If You
 *     institute patent litigation against any entity (including a
 *     cross-claim or counterclaim in a lawsuit) alleging that the Work
 *     or a Contribution incorporated within the Work constitutes direct
 *     or contributory patent infringement, then any patent licenses
 *     granted to You under this License for that Work shall terminate
 *     as of the date such litigation is filed.
 *
 *  4. Redistribution. You may reproduce and distribute copies of the
 *     Work or Derivative Works thereof in any medium, with or without
 *     modifications, and in Source or Object form, provided that You
 *     meet the following conditions:
 *
 *     (a) You must give any other recipients of the Work or
 *         Derivative Works a copy of this License; and
 *
 *     (b) You must cause any modified files to carry prominent notices
 *         stating that You changed the files; and
 *
 *     (c) You must retain, in the Source form of any Derivative Works
 *         that You distribute, all copyright, patent, trademark, and
 *         attribution notices from the Source form of the Work,
 *         excluding those notices that do not pertain to any part of
 *         the Derivative Works; and
 *
 *     (d) If the Work includes a "NOTICE" text file as part of its
 *         distribution, then any Derivative Works that You distribute must
 *         include a readable copy of the attribution notices contained
 *         within such NOTICE file, excluding those notices that do not
 *         pertain to any part of the Derivative Works, in at least one
 *         of the following places: within a NOTICE text file distributed
 *         as part of the Derivative Works; within the Source form or
 *         documentation, if provided along with the Derivative Works; or,
 *         within a display generated by the Derivative Works, if and
 *         wherever such third-party notices normally appear. The contents
 *         of the NOTICE file are for informational purposes only and
 *         do not modify the License. You may add Your own attribution
 *         notices within Derivative Works that You distribute, alongside
 *         or as an addendum to the NOTICE text from the Work, provided
 *         that such additional attribution notices cannot be construed
 *         as modifying the License.
 *
 *     You may add Your own copyright statement to Your modifications and
 *     may provide additional or different license terms and conditions
 *     for use, reproduction, or distribution of Your modifications, or
 *     for any such Derivative Works as a whole, provided Your use,
 *     reproduction, and distribution of the Work otherwise complies with
 *     the conditions stated in this License.
 *
 *  5. Submission of Contributions. Unless You explicitly state otherwise,
 *     any Contribution intentionally submitted for inclusion in the Work
 *     by You to the Licensor shall be under the terms and conditions of
 *     this License, without any additional terms or conditions.
 *     Notwithstanding the above, nothing herein shall supersede or modify
 *     the terms of any separate license agreement you may have executed
 *     with Licensor regarding such Contributions.
 *
 *  6. Trademarks. This License does not grant permission to use the trade
 *     names, trademarks, service marks, or product names of the Licensor,
 *     except as required for reasonable and customary use in describing the
 *     origin of the Work and reproducing the content of the NOTICE file.
 *
 *  7. Disclaimer of Warranty. Unless required by applicable law or
 *     agreed to in writing, Licensor provides the Work (and each
 *     Contributor provides its Contributions) on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 *     implied, including, without limitation, any warranties or conditions
 *     of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
 *     PARTICULAR PURPOSE. You are solely responsible for determining the
 *     appropriateness of using or redistributing the Work and assume any
 *     risks associated with Your exercise of permissions under this License.
 *
 *  8. Limitation of Liability. In no event and under no legal theory,
 *     whether in tort (including negligence), contract, or otherwise,
 *     unless required by applicable law (such as deliberate and grossly
 *     negligent acts) or agreed to in writing, shall any Contributor be
 *     liable to You for damages, including any direct, indirect, special,
 *     incidental, or consequential damages of any character arising as a
 *     result of this License or out of the use or inability to use the
 *     Work (including but not limited to damages for loss of goodwill,
 *     work stoppage, computer failure or malfunction, or any and all
 *     other commercial damages or losses), even if such Contributor
 *     has been advised of the possibility of such damages.
 *
 *  9. Accepting Warranty or Additional Liability. While redistributing
 *     the Work or Derivative Works thereof, You may choose to offer,
 *     and charge a fee for, acceptance of support, warranty, indemnity,
 *     or other liability obligations and/or rights consistent with this
 *     License. However, in accepting such obligations, You may act only
 *     on Your own behalf and on Your sole responsibility, not on behalf
 *     of any other Contributor, and only if You agree to indemnify,
 *     defend, and hold each Contributor harmless for any liability
 *     incurred by, or claims asserted against, such Contributor by reason
 *     of your accepting any such warranty or additional liability.
 *
 *  END OF TERMS AND CONDITIONS
 *
 *  APPENDIX: How to apply the Apache License to your work.
 *
 *     To apply the Apache License to your work, attach the following
 *     boilerplate notice, with the fields enclosed by brackets "[]"
 *     replaced with your own identifying information. (Don't include
 *     the brackets!)  The text should be enclosed in the appropriate
 *     comment syntax for the file format. We also recommend that a
 *     file or class name and description of purpose be included on the
 *     same "printed page" as the copyright notice for easier
 *     identification within third-party archives.
 *
 *  Copyright 2017 Google Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *                                  Apache License
 *                          Version 2.0, January 2004
 *                       http://www.apache.org/licenses/
 *
 *  TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
 *
 *  1. Definitions.
 *
 *     "License" shall mean the terms and conditions for use, reproduction,
 *     and distribution as defined by Sections 1 through 9 of this document.
 *
 *     "Licensor" shall mean the copyright owner or entity authorized by
 *     the copyright owner that is granting the License.
 *
 *     "Legal Entity" shall mean the union of the acting entity and all
 *     other entities that control, are controlled by, or are under common
 *     control with that entity. For the purposes of this definition,
 *     "control" means (i) the power, direct or indirect, to cause the
 *     direction or management of such entity, whether by contract or
 *     otherwise, or (ii) ownership of fifty percent (50%) or more of the
 *     outstanding shares, or (iii) beneficial ownership of such entity.
 *
 *     "You" (or "Your") shall mean an individual or Legal Entity
 *     exercising permissions granted by this License.
 *
 *     "Source" form shall mean the preferred form for making modifications,
 *     including but not limited to software source code, documentation
 *     source, and configuration files.
 *
 *     "Object" form shall mean any form resulting from mechanical
 *     transformation or translation of a Source form, including but
 *     not limited to compiled object code, generated documentation,
 *     and conversions to other media types.
 *
 *     "Work" shall mean the work of authorship, whether in Source or
 *     Object form, made available under the License, as indicated by a
 *     copyright notice that is included in or attached to the work
 *     (an example is provided in the Appendix below).
 *
 *     "Derivative Works" shall mean any work, whether in Source or Object
 *     form, that is based on (or derived from) the Work and for which the
 *     editorial revisions, annotations, elaborations, or other modifications
 *     represent, as a whole, an original work of authorship. For the purposes
 *     of this License, Derivative Works shall not include works that remain
 *     separable from, or merely link (or bind by name) to the interfaces of,
 *     the Work and Derivative Works thereof.
 *
 *     "Contribution" shall mean any work of authorship, including
 *     the original version of the Work and any modifications or additions
 *     to that Work or Derivative Works thereof, that is intentionally
 *     submitted to Licensor for inclusion in the Work by the copyright owner
 *     or by an individual or Legal Entity authorized to submit on behalf of
 *     the copyright owner. For the purposes of this definition, "submitted"
 *     means any form of electronic, verbal, or written communication sent
 *     to the Licensor or its representatives, including but not limited to
 *     communication on electronic mailing lists, source code control systems,
 *     and issue tracking systems that are managed by, or on behalf of, the
 *     Licensor for the purpose of discussing and improving the Work, but
 *     excluding communication that is conspicuously marked or otherwise
 *     designated in writing by the copyright owner as "Not a Contribution."
 *
 *     "Contributor" shall mean Licensor and any individual or Legal Entity
 *     on behalf of whom a Contribution has been received by Licensor and
 *     subsequently incorporated within the Work.
 *
 *  2. Grant of Copyright License. Subject to the terms and conditions of
 *     this License, each Contributor hereby grants to You a perpetual,
 *     worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 *     copyright license to reproduce, prepare Derivative Works of,
 *     publicly display, publicly perform, sublicense, and distribute the
 *     Work and such Derivative Works in Source or Object form.
 *
 *  3. Grant of Patent License. Subject to the terms and conditions of
 *     this License, each Contributor hereby grants to You a perpetual,
 *     worldwide, non-exclusive, no-charge, royalty-free, irrevocable
 *     (except as stated in this section) patent license to make, have made,
 *     use, offer to sell, sell, import, and otherwise transfer the Work,
 *     where such license applies only to those patent claims licensable
 *     by such Contributor that are necessarily infringed by their
 *     Contribution(s) alone or by combination of their Contribution(s)
 *     with the Work to which such Contribution(s) was submitted. If You
 *     institute patent litigation against any entity (including a
 *     cross-claim or counterclaim in a lawsuit) alleging that the Work
 *     or a Contribution incorporated within the Work constitutes direct
 *     or contributory patent infringement, then any patent licenses
 *     granted to You under this License for that Work shall terminate
 *     as of the date such litigation is filed.
 *
 *  4. Redistribution. You may reproduce and distribute copies of the
 *     Work or Derivative Works thereof in any medium, with or without
 *     modifications, and in Source or Object form, provided that You
 *     meet the following conditions:
 *
 *     (a) You must give any other recipients of the Work or
 *         Derivative Works a copy of this License; and
 *
 *     (b) You must cause any modified files to carry prominent notices
 *         stating that You changed the files; and
 *
 *     (c) You must retain, in the Source form of any Derivative Works
 *         that You distribute, all copyright, patent, trademark, and
 *         attribution notices from the Source form of the Work,
 *         excluding those notices that do not pertain to any part of
 *         the Derivative Works; and
 *
 *     (d) If the Work includes a "NOTICE" text file as part of its
 *         distribution, then any Derivative Works that You distribute must
 *         include a readable copy of the attribution notices contained
 *         within such NOTICE file, excluding those notices that do not
 *         pertain to any part of the Derivative Works, in at least one
 *         of the following places: within a NOTICE text file distributed
 *         as part of the Derivative Works; within the Source form or
 *         documentation, if provided along with the Derivative Works; or,
 *         within a display generated by the Derivative Works, if and
 *         wherever such third-party notices normally appear. The contents
 *         of the NOTICE file are for informational purposes only and
 *         do not modify the License. You may add Your own attribution
 *         notices within Derivative Works that You distribute, alongside
 *         or as an addendum to the NOTICE text from the Work, provided
 *         that such additional attribution notices cannot be construed
 *         as modifying the License.
 *
 *     You may add Your own copyright statement to Your modifications and
 *     may provide additional or different license terms and conditions
 *     for use, reproduction, or distribution of Your modifications, or
 *     for any such Derivative Works as a whole, provided Your use,
 *     reproduction, and distribution of the Work otherwise complies with
 *     the conditions stated in this License.
 *
 *  5. Submission of Contributions. Unless You explicitly state otherwise,
 *     any Contribution intentionally submitted for inclusion in the Work
 *     by You to the Licensor shall be under the terms and conditions of
 *     this License, without any additional terms or conditions.
 *     Notwithstanding the above, nothing herein shall supersede or modify
 *     the terms of any separate license agreement you may have executed
 *     with Licensor regarding such Contributions.
 *
 *  6. Trademarks. This License does not grant permission to use the trade
 *     names, trademarks, service marks, or product names of the Licensor,
 *     except as required for reasonable and customary use in describing the
 *     origin of the Work and reproducing the content of the NOTICE file.
 *
 *  7. Disclaimer of Warranty. Unless required by applicable law or
 *     agreed to in writing, Licensor provides the Work (and each
 *     Contributor provides its Contributions) on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 *     implied, including, without limitation, any warranties or conditions
 *     of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
 *     PARTICULAR PURPOSE. You are solely responsible for determining the
 *     appropriateness of using or redistributing the Work and assume any
 *     risks associated with Your exercise of permissions under this License.
 *
 *  8. Limitation of Liability. In no event and under no legal theory,
 *     whether in tort (including negligence), contract, or otherwise,
 *     unless required by applicable law (such as deliberate and grossly
 *     negligent acts) or agreed to in writing, shall any Contributor be
 *     liable to You for damages, including any direct, indirect, special,
 *     incidental, or consequential damages of any character arising as a
 *     result of this License or out of the use or inability to use the
 *     Work (including but not limited to damages for loss of goodwill,
 *     work stoppage, computer failure or malfunction, or any and all
 *     other commercial damages or losses), even if such Contributor
 *     has been advised of the possibility of such damages.
 *
 *  9. Accepting Warranty or Additional Liability. While redistributing
 *     the Work or Derivative Works thereof, You may choose to offer,
 *     and charge a fee for, acceptance of support, warranty, indemnity,
 *     or other liability obligations and/or rights consistent with this
 *     License. However, in accepting such obligations, You may act only
 *     on Your own behalf and on Your sole responsibility, not on behalf
 *     of any other Contributor, and only if You agree to indemnify,
 *     defend, and hold each Contributor harmless for any liability
 *     incurred by, or claims asserted against, such Contributor by reason
 *     of your accepting any such warranty or additional liability.
 *
 *  END OF TERMS AND CONDITIONS
 *
 *  APPENDIX: How to apply the Apache License to your work.
 *
 *     To apply the Apache License to your work, attach the following
 *     boilerplate notice, with the fields enclosed by brackets "[]"
 *     replaced with your own identifying information. (Don't include
 *     the brackets!)  The text should be enclosed in the appropriate
 *     comment syntax for the file format. We also recommend that a
 *     file or class name and description of purpose be included on the
 *     same "printed page" as the copyright notice for easier
 *     identification within third-party archives.
 *
 *  Copyright 2017 Google Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import argon2 from 'argon2-browser';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.argon2 = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    const global = typeof self !== 'undefined' ? self : this;

    /**
     * @enum
     */
    const ArgonType = {
        Argon2d: 0,
        Argon2i: 1,
        Argon2id: 2,
    };

    function loadModule(mem) {
        if (loadModule._promise) {
            return loadModule._promise;
        }
        if (loadModule._module) {
            return Promise.resolve(loadModule._module);
        }
        let promise;
        if (
            global.process &&
            global.process.versions &&
            global.process.versions.node
        ) {
            promise = loadWasmModule().then(
                (Module) =>
                    new Promise((resolve) => {
                        Module.postRun = () => resolve(Module);
                    })
            );
        } else {
            promise = loadWasmBinary().then((wasmBinary) => {
                const wasmMemory = mem ? createWasmMemory(mem) : undefined;
                return initWasm(wasmBinary, wasmMemory);
            });
        }
        loadModule._promise = promise;
        return promise.then((Module) => {
            loadModule._module = Module;
            delete loadModule._promise;
            return Module;
        });
    }

    function initWasm(wasmBinary, wasmMemory) {
        return new Promise((resolve) => {
            global.Module = {
                wasmBinary,
                wasmMemory,
                postRun() {
                    resolve(Module);
                },
            };
            return loadWasmModule();
        });
    }

    function loadWasmModule() {
        if (global.loadArgon2WasmModule) {
            return global.loadArgon2WasmModule();
        }
        if (typeof require === 'function') {
            return Promise.resolve(require('/node_modules/argon2-browser/dist/argon2.js'));
        }
        return import('/node_modules/argon2-browser/dist/argon2.js');
    }

    function loadWasmBinary() {
        const simdSupported = checkSimd();
        console.log(simdSupported);
        const wasmPath = global.argon2WasmPath ||
            `/node_modules/argon2-browser/dist/argon2${simdSupported ? "-simd" : ""}.wasm`;

        console.log(wasmPath);

        return fetch(wasmPath)
            .then((response) => response.arrayBuffer())
            .then((ab) => new Uint8Array(ab));
    }

    function checkSimd() {
        return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]));
    }

    function decodeWasmBinary(base64) {
        if (typeof Buffer === 'function') {
            return new Uint8Array(Buffer.from(base64, 'base64'));
        }
        const text = atob(base64);
        const binary = new Uint8Array(new ArrayBuffer(text.length));
        for (let i = 0; i < text.length; i++) {
            binary[i] = text.charCodeAt(i);
        }
        return binary;
    }

    function createWasmMemory(mem) {
        const KB = 1024;
        const MB = 1024 * KB;
        const GB = 1024 * MB;
        const WASM_PAGE_SIZE = 64 * KB;

        const totalMemory = (2 * GB - 64 * KB) / WASM_PAGE_SIZE;
        const initialMemory = Math.min(
            Math.max(Math.ceil((mem * KB) / WASM_PAGE_SIZE), 256) + 256,
            totalMemory
        );

        return new WebAssembly.Memory({
            initial: initialMemory,
            maximum: totalMemory,
        });
    }

    function allocateArray(Module, arr) {
        return Module.allocate(arr, 'i8', Module.ALLOC_NORMAL);
    }

    function allocateArrayStr(Module, arr) {
        const nullTerminatedArray = new Uint8Array([...arr, 0]);
        return allocateArray(Module, nullTerminatedArray);
    }

    function encodeUtf8(str) {
        if (typeof str !== 'string') {
            return str;
        }
        if (typeof TextEncoder === 'function') {
            return new TextEncoder().encode(str);
        } else if (typeof Buffer === 'function') {
            return Buffer.from(str);
        } else {
            throw new Error("Don't know how to encode UTF8");
        }
    }

    /**
     * Argon2 hash
     * @param {string|Uint8Array} params.pass - password string
     * @param {string|Uint8Array} params.salt - salt string
     * @param {number} [params.time=1] - the number of iterations
     * @param {number} [params.mem=1024] - used memory, in KiB
     * @param {number} [params.hashLen=24] - desired hash length
     * @param {number} [params.parallelism=1] - desired parallelism
     * @param {number} [params.type=argon2.ArgonType.Argon2d] - hash type:
     *      argon2.ArgonType.Argon2d
     *      argon2.ArgonType.Argon2i
     *      argon2.ArgonType.Argon2id
     *
     * @return Promise
     *
     * @example
     *  argon2.hash({ pass: 'password', salt: 'somesalt' })
     *      .then(h => console.log(h.hash, h.hashHex, h.encoded))
     *      .catch(e => console.error(e.message, e.code))
     */
    function argon2Hash(params) {
        const mCost = params.mem || 1024;
        return loadModule(mCost).then((Module) => {
            const tCost = params.time || 1;
            const parallelism = params.parallelism || 1;
            const pwdEncoded = encodeUtf8(params.pass);
            const pwd = allocateArrayStr(Module, pwdEncoded);
            const pwdlen = pwdEncoded.length;
            const saltEncoded = encodeUtf8(params.salt);
            const salt = allocateArrayStr(Module, saltEncoded);
            const saltlen = saltEncoded.length;
            const argon2Type = params.type || ArgonType.Argon2d;
            const hash = Module.allocate(
                new Array(params.hashLen || 24),
                'i8',
                Module.ALLOC_NORMAL
            );
            const secret = params.secret
                ? allocateArray(Module, params.secret)
                : 0;
            const secretlen = params.secret ? params.secret.byteLength : 0;
            const ad = params.ad ? allocateArray(Module, params.ad) : 0;
            const adlen = params.ad ? params.ad.byteLength : 0;
            const hashlen = params.hashLen || 24;
            const encodedlen = Module._argon2_encodedlen(
                tCost,
                mCost,
                parallelism,
                saltlen,
                hashlen,
                argon2Type
            );
            const encoded = Module.allocate(
                new Array(encodedlen + 1),
                'i8',
                Module.ALLOC_NORMAL
            );
            const version = 0x13;
            let err;
            let res;
            try {
                res = Module._argon2_hash_ext(
                    tCost,
                    mCost,
                    parallelism,
                    pwd,
                    pwdlen,
                    salt,
                    saltlen,
                    hash,
                    hashlen,
                    encoded,
                    encodedlen,
                    argon2Type,
                    secret,
                    secretlen,
                    ad,
                    adlen,
                    version
                );
            } catch (e) {
                err = e;
            }
            let result;
            if (res === 0 && !err) {
                let hashStr = '';
                const hashArr = new Uint8Array(hashlen);
                for (let i = 0; i < hashlen; i++) {
                    const byte = Module.HEAP8[hash + i];
                    hashArr[i] = byte;
                    hashStr += ('0' + (0xff & byte).toString(16)).slice(-2);
                }
                const encodedStr = Module.UTF8ToString(encoded);
                result = {
                    hash: hashArr,
                    hashHex: hashStr,
                    encoded: encodedStr,
                };
            } else {
                try {
                    if (!err) {
                        err = Module.UTF8ToString(
                            Module._argon2_error_message(res)
                        );
                    }
                } catch (e) {}
                result = { message: err, code: res };
            }
            try {
                Module._free(pwd);
                Module._free(salt);
                Module._free(hash);
                Module._free(encoded);
                if (ad) {
                    Module._free(ad);
                }
                if (secret) {
                    Module._free(secret);
                }
            } catch (e) {}
            if (err) {
                throw result;
            } else {
                return result;
            }
        });
    }

    /**
     * Argon2 verify function
     * @param {string} params.pass - password string
     * @param {string|Uint8Array} params.encoded - encoded hash
     * @param {number} [params.type=argon2.ArgonType.Argon2d] - hash type:
     *      argon2.ArgonType.Argon2d
     *      argon2.ArgonType.Argon2i
     *      argon2.ArgonType.Argon2id
     *
     * @returns Promise
     *
     * @example
     *  argon2.verify({ pass: 'password', encoded: 'encoded-hash' })
     *      .then(() => console.log('OK'))
     *      .catch(e => console.error(e.message, e.code))
     */
    function argon2Verify(params) {
        return loadModule().then((Module) => {
            const pwdEncoded = encodeUtf8(params.pass);
            const pwd = allocateArrayStr(Module, pwdEncoded);
            const pwdlen = pwdEncoded.length;
            const secret = params.secret
                ? allocateArray(Module, params.secret)
                : 0;
            const secretlen = params.secret ? params.secret.byteLength : 0;
            const ad = params.ad ? allocateArray(Module, params.ad) : 0;
            const adlen = params.ad ? params.ad.byteLength : 0;
            const encEncoded = encodeUtf8(params.encoded);
            const enc = allocateArrayStr(Module, encEncoded);
            let argon2Type = params.type;
            if (argon2Type === undefined) {
                let typeStr = params.encoded.split('$')[1];
                if (typeStr) {
                    typeStr = typeStr.replace('a', 'A');
                    argon2Type = ArgonType[typeStr] || ArgonType.Argon2d;
                }
            }
            let err;
            let res;
            try {
                res = Module._argon2_verify_ext(
                    enc,
                    pwd,
                    pwdlen,
                    secret,
                    secretlen,
                    ad,
                    adlen,
                    argon2Type
                );
            } catch (e) {
                err = e;
            }
            let result;
            if (res || err) {
                try {
                    if (!err) {
                        err = Module.UTF8ToString(
                            Module._argon2_error_message(res)
                        );
                    }
                } catch (e) {}
                result = { message: err, code: res };
            }
            try {
                Module._free(pwd);
                Module._free(enc);
            } catch (e) {}
            if (err) {
                throw result;
            } else {
                return result;
            }
        });
    }

    function unloadRuntime() {
        if (loadModule._module) {
            loadModule._module.unloadRuntime();
            delete loadModule._promise;
            delete loadModule._module;
        }
    }

    return {
        ArgonType,
        hash: argon2Hash,
        verify: argon2Verify,
        unloadRuntime,
    };
});