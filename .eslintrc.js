const paths = require("./config/paths");

module.exports = {
    extends: ["wiremore", "wiremore/react", "wiremore/typescript"],
    globals: {
        __BROWSER__: true,
        __SERVER__: true
    },
    settings: {
        "import/resolver": {
            node: {
                paths: paths.resolveModules,
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        },
        react: {
            version: "detect"
        }
    },
    rules: {
        "import/no-unassigned-import": 0,
        "import/no-named-as-default-member": 0,
        "prettier/prettier": "error",
        quotes: [2, "double"],
        "react/prop-types": 0,
        "comma-dangle": ["error", "never"],
        "linebreak-style": 0
    }
    // overrides: [{ files: ['*.tsx'], rules: { 'import/named': 0 } }],
};
