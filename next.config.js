const withPWAInit = require('next-pwa')
const { PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  const pwa = {
    dest: 'public',
    skipWaiting: true, // installs new SW when available without a prompt, we only need to send a reload request to user.
    dynamicStartUrl: false, // recommend: set to false if your start url always returns same HTML document, then start url will be precached, this will help to speed up first load.
    reloadOnOnline: false, // Prevents reloads on offline/online switch
    buildExcludes: ["app-build-manifest.json"],
  };
  const config = {
    ...defaultConfig,
    eslint: {
      ignoreDuringBuilds: process.env.LINTMODE === 'nolint', // for fastbuild script
    },
  }

  if (phase === PHASE_PRODUCTION_BUILD) {
    // Attributes generateBuildId and additionalManifestEntries are only needed
    // for the build and calculating their value is time-consuming.
    // So we add them here, just for the build.
    const getBuildId = require('./util/buildid.js')
    const getStaticPrecacheEntries = require('./util/staticprecache.js')
    const getGeneratedPrecacheEntries = require('./util/precache.js')

    const buildId = getBuildId()

    config.generateBuildId = getBuildId
    pwa.additionalManifestEntries = [
      ...getStaticPrecacheEntries({
        // exclude icon-related files from the precache since they are platform specific
        // note: no need to pass publicExcludes to next-pwa, it's not used for anything else
        publicExcludes: [
          '!*.png',
          '!*.ico',
          '!browserconfig.xml',
        ],
      }),
      ...getGeneratedPrecacheEntries(buildId),
    ]
  }

  const withPWA = withPWAInit(pwa);


  return withPWA(config)
}
