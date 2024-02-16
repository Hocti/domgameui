/*
import path from 'path';
import fs from 'fs';

import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
*/
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { dts } from "rollup-plugin-dts";
import resolve from '@rollup/plugin-node-resolve';

import repo from "./package.json" assert { type: 'json' };

const isProduction = process.env.NODE_ENV === 'production';

const esbuildConfig = {
    target: 'es2020',
    minifySyntax: true,
    define: {
        'process.env.VERSION': `'${repo.version}'`,
        'process.env.DEBUG': isProduction?'false':'true',
    },
    treeShaking: true,
    minify: false,
    tsconfigRaw: '{"compilerOptions":{"useDefineForClassFields":false,"experimentalDecorators":true}}',
}

const plugins = [
    esbuild(esbuildConfig),
    resolve({
        browser: true,
        preferBuiltins: false,
    }),
    commonjs(),
    /*
    json(),
    */
];

const sourcemap = true;//!isProduction;
const freeze=false;
const compiled = (new Date()).toUTCString().replace(/GMT/g, "UTC");

const banner = `/*!
 * ${repo.name} - v${repo.version}
 * By ${repo.author}
 * Compiled ${compiled}
 *
 * ${repo.name} is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */`;

const globals={controlwrap:'controlwrap'}


async function main() {
    const results=[];
    
    results.push(
    {
        input: "src/index.ts",
        external: Object.keys(repo.peerDependencies),
        output: [
            {
                name: repo.namespace,
                banner,
                freeze,
                sourcemap,
                format: "iife",
                file: repo.bundle,
                globals
            },
            {
                name: repo.namespace,
                banner,
                freeze,
                sourcemap,
                format: "esm",
                file: repo.module,
                globals
            }/*,
            {
                banner,
                freeze,
                sourcemap,
                format: "cjs",
                file: repo.main,
                globals
            }*/
        ],
        plugins
    });

    //if(isProduction){
        
        results.push(
            {
                input: "src/index.ts",
                external: Object.keys(repo.peerDependencies),
                output: [
                    {
                        name: repo.namespace,
                        banner,
                        file: repo.types,
                        format: "es",
                        globals
                    }
                ],
                plugins:[dts()],
        });
    //}        
    return results;
}


export default main();