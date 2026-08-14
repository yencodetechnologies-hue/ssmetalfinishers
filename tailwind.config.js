module.exports = {
  "darkMode": "class",
  "content": [
    "./*.html"
  ],
  "theme": {
    "extend": {
      "colors": {
        "on-background": "#1a1c19",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#4b6544",
        "surface": "#faf9f4",
        "on-tertiary-fixed-variant": "#474646",
        "on-tertiary-container": "#aeabab",
        "on-tertiary-fixed": "#1c1b1b",
        "surface-container-high": "#e9e8e3",
        "on-primary-container": "#97b48d",
        "on-secondary-fixed-variant": "#44474b",
        "inverse-on-surface": "#f1f1ec",
        "on-error": "#ffffff",
        "on-secondary-container": "#616569",
        "inverse-surface": "#2f312e",
        "tertiary-fixed": "#e5e2e1",
        "secondary": "#5b5f63",
        "on-surface-variant": "#434840",
        "on-primary-fixed-variant": "#344d2e",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#c4c6cc",
        "primary-container": "#2d4628",
        "on-primary-fixed": "#082007",
        "error-container": "#ffdad6",
        "primary": "#172f14",
        "outline-variant": "#c3c8bd",
        "secondary-fixed": "#e0e2e8",
        "on-error-container": "#93000a",
        "primary-fixed-dim": "#b1cfa7",
        "surface-variant": "#e3e3de",
        "error": "#ba1a1a",
        "surface-dim": "#dbdad5",
        "on-secondary": "#ffffff",
        "on-secondary-fixed": "#181c20",
        "tertiary-container": "#414040",
        "surface-container-highest": "#e3e3de",
        "inverse-primary": "#b1cfa7",
        "surface-container": "#efeee9",
        "primary-fixed": "#cdebc1",
        "tertiary": "#8fd67a",
        "surface-bright": "#faf9f4",
        "on-surface": "#1a1c19",
        "on-tertiary": "#ffffff",
        "tertiary-fixed-dim": "#c8c6c5",
        "outline": "#73796f",
        "secondary-container": "#e0e2e8",
        "background": "#faf9f4",
        "surface-container-low": "#f4f4ef",
        "primary-dark": "#0b1709",
        "tertiary-light": "#b5f3a3",
        "surface-dark": "#101610"
      },
      "borderRadius": {
        "DEFAULT": "5px",
        "sm": "5px",
        "lg": "5px",
        "xl": "5px",
        "2xl": "5px",
        "full": "9999px"
      },
      "spacing": {
        "margin-mobile": "20px",
        "container-max": "1440px",
        "gutter": "24px",
        "unit": "8px",
        "margin-desktop": "64px"
      },
      "fontFamily": {
        "mono-data": [
          "Geist"
        ],
        "body-lg": [
          "Geist"
        ],
        "label-caps": [
          "Geist"
        ],
        "body-md": [
          "Geist"
        ],
        "headline-lg-mobile": [
          "Geist"
        ],
        "headline-md": [
          "Geist"
        ],
        "headline-lg": [
          "Geist"
        ],
        "display-lg": [
          "Geist"
        ],
        "geist": [
          "Geist",
          "sans-serif"
        ]
      },
      "fontSize": {
        "mono-data": [
          "14px",
          {
            "lineHeight": "20px",
            "letterSpacing": "0px",
            "fontWeight": "500"
          }
        ],
        "body-lg": [
          "18px",
          {
            "lineHeight": "28px",
            "letterSpacing": "0.01em",
            "fontWeight": "400"
          }
        ],
        "label-caps": [
          "12px",
          {
            "lineHeight": "16px",
            "letterSpacing": "0.1em",
            "fontWeight": "600"
          }
        ],
        "body-md": [
          "16px",
          {
            "lineHeight": "24px",
            "letterSpacing": "0.01em",
            "fontWeight": "400"
          }
        ],
        "headline-lg-mobile": [
          "32px",
          {
            "lineHeight": "40px",
            "letterSpacing": "-0.01em",
            "fontWeight": "700"
          }
        ],
        "headline-md": [
          "32px",
          {
            "lineHeight": "40px",
            "letterSpacing": "-0.01em",
            "fontWeight": "600"
          }
        ],
        "headline-lg": [
          "48px",
          {
            "lineHeight": "56px",
            "letterSpacing": "-0.01em",
            "fontWeight": "700"
          }
        ],
        "display-lg": [
          "72px",
          {
            "lineHeight": "80px",
            "letterSpacing": "-0.02em",
            "fontWeight": "800"
          }
        ]
      }
    }
  },
  "plugins": [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
};
