import laioutrrc from '../laioutrrc.json';
import srcModule from '../src/module';

// Disable project secret key for playground
laioutrrc.laioutr.projectSecretKey = false as any;

export default defineNuxtConfig({
  modules: [
    srcModule,
    '@pinia/nuxt', // Added to show in devtools
    '@laioutr-core/frontend-core',
  ],
  laioutr: {
    laioutrrc: laioutrrc as any,
  },
  '@laioutr/app-hygraph': {
    contentApiUrl: 'https://eu-west-2.cdn.hygraph.com/content/cmii2mlmu00vb07uwl2p9xs4r/master',
    imageBaseUrl: 'https://eu-west-2.graphassets.com/cmii2mlqi0dux06l5543v7nkc',
    token:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NjQ5NzE0NzEsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY21paTJtbG11MDB2YjA3dXdsMnA5eHM0ci9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiMTAwYzQ4MmQtODliZC00MjQ0LWEyMWItNzAyMzYxYWQ2Yzk2IiwianRpIjoiY21pdGVmejVzMGtzMTA2bWw4d2Q4OG95ZCJ9.lstHONfMoYGDnech1ljLp1kIhXsp3su7jQQmVhv1Pws5Xll6mPHNrEmk2R2PQoZnaDvWcOVCnLcPGwszILEwouNFhpYe45D4ds7BSB9s67wby67E4p0uT62Q0yz6jm8PNXg50XlLmxyd_brd6yDW6V4y7W9gHzt-s-QjVo6BwT9mLeSAicRJNIxm28nHxAkpHTfM1VNVyqG3lBaygEVUb7ffLMD6YDkCxLiX57uee-DqvdVFJ9x9EXFrwSIL9nGgjOWDZXe3k6V0NiIqGKGLwOvu4RNxYEbXFF_EM3Yvht4Ga7NHo4LEc5LkZADDILEQczJpO4yH1MKAF7tTltlqNgo33UtHnoUOoKgqKahogNAkCC8xgeFKdKfydcehINdY_aYYduuPbHW-s7qRy4VdrzBCwtqgRjUejqZNunMmo_0cX3AjGu5nxZHXQeUISUKcRBGFZJyfCXs5C2I1S_WudzznkPdsEu8cNeB24BTLNGNux70cN6qBUTkPLPUfBIOcvb12gfVAIG3fdMA5dU_mTFq8oshA3AReUsxTlrwFsHR28XJkvII_1PAYr4go2eiTyGbhmhE39sBozmIGu0C7icS6gA1K7YALljUIosZKZht7brGRtyuGSC59vPI-PamsrfDNoDQ0q36LyfjNXllFm4cUFrNKowcpwGmwiSCUPko',
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-09-11',
});
