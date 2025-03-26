import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// Define theme constants
const PRIMARY = {
  lighter: "#D1E9FC",
  light: "#76B0F1",
  main: "#0969da",
  dark: "#103996",
  darker: "#061B64",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#6e5494",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#212B36",
};

const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
  contrastText: "#212B36",
};

const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
  contrastText: "#fff",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
};

const common = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  direction: "ltr",
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: "2.5rem",
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:960px)": {
        fontSize: "3.5rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "4rem",
      },
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.3,
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:960px)": {
        fontSize: "3rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "3.5rem",
      },
    },
    h3: {
      fontWeight: 700,
      lineHeight: 1.4,
      fontSize: "1.75rem",
      "@media (min-width:600px)": {
        fontSize: "2rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2.25rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "2.5rem",
      },
    },
    h4: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: "1.5rem",
      "@media (min-width:600px)": {
        fontSize: "1.75rem",
      },
      "@media (min-width:960px)": {
        fontSize: "2rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "2.25rem",
      },
    },
    h5: {
      fontWeight: 700,
      lineHeight: 1.5,
      fontSize: "1.25rem",
      "@media (min-width:600px)": {
        fontSize: "1.4rem",
      },
      "@media (min-width:960px)": {
        fontSize: "1.5rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "1.6rem",
      },
    },
    h6: {
      fontWeight: 700,
      lineHeight: 1.6,
      fontSize: "1.125rem",
      "@media (min-width:960px)": {
        fontSize: "1.25rem",
      },
    },
    subtitle1: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: "1rem",
    },
    subtitle2: {
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: "0.875rem",
    },
    body1: {
      lineHeight: 1.5,
      fontSize: "1rem",
    },
    body2: {
      lineHeight: 1.6,
      fontSize: "0.875rem",
    },
    button: {
      fontWeight: 600,
      lineHeight: 24 / 14,
      fontSize: "0.875rem",
      textTransform: "none",
    },
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(0, 0, 0, 0.08)",
    "0px 1px 5px rgba(0, 0, 0, 0.08)",
    "0px 1px 8px rgba(0, 0, 0, 0.08)",
    "0px 1px 10px rgba(0, 0, 0, 0.08)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.08)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.08)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.08)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.08)",
    "0px 5px 8px -3px rgba(0, 0, 0, 0.08)",
    "0px 6px 10px -4px rgba(0, 0, 0, 0.08)",
    "0px 7px 10px -4px rgba(0, 0, 0, 0.08)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.08)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.08)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.08)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.08)",
    "0px 12px 17px -7px rgba(0, 0, 0, 0.08)",
    "0px 13px 19px -8px rgba(0, 0, 0, 0.08)",
    "0px 14px 21px -8px rgba(0, 0, 0, 0.08)",
    "0px 15px 22px -9px rgba(0, 0, 0, 0.08)",
    "0px 16px 24px -9px rgba(0, 0, 0, 0.08)",
    "0px 17px 26px -10px rgba(0, 0, 0, 0.08)",
    "0px 18px 28px -10px rgba(0, 0, 0, 0.08)",
    "0px 19px 29px -11px rgba(0, 0, 0, 0.08)",
    "0px 20px 31px -11px rgba(0, 0, 0, 0.08)",
  ],
};

const getDesignTokens = (mode) => ({
  ...common,
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: PRIMARY,
          secondary: SECONDARY,
          success: SUCCESS,
          warning: WARNING,
          error: ERROR,
          grey: GREY,
          divider: alpha(GREY[500], 0.24),
          text: {
            primary: GREY[800],
            secondary: GREY[600],
            disabled: GREY[500],
          },
          background: {
            paper: "#fff",
            default: "#fff",
            neutral: GREY[200],
          },
          action: {
            active: GREY[600],
            hover: alpha(GREY[500], 0.08),
            selected: alpha(GREY[500], 0.16),
            disabled: alpha(GREY[500], 0.8),
            disabledBackground: alpha(GREY[500], 0.24),
            focus: alpha(GREY[500], 0.24),
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
          },
        }
      : {
          primary: PRIMARY,
          secondary: SECONDARY,
          success: SUCCESS,
          warning: WARNING,
          error: ERROR,
          grey: GREY,
          divider: alpha(GREY[500], 0.24),
          text: {
            primary: "#fff",
            secondary: GREY[500],
            disabled: GREY[600],
          },
          background: {
            paper: GREY[800],
            default: GREY[900],
            neutral: alpha(GREY[500], 0.16),
          },
          action: {
            active: GREY[500],
            hover: alpha(GREY[500], 0.08),
            selected: alpha(GREY[500], 0.16),
            disabled: GREY[600],
            disabledBackground: alpha(GREY[500], 0.24),
            focus: alpha(GREY[500], 0.24),
            hoverOpacity: 0.08,
            disabledOpacity: 0.48,
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: common.shadows[2],
          borderRadius: Number(common.shape.borderRadius) * 2,
          position: "relative",
          zIndex: 0,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: GREY[600],
          backgroundColor: GREY[200],
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          boxShadow: common.shadows[2],
        },
        standardInfo: {
          color: "#1939B7",
          backgroundColor: "#D6E4FF",
        },
        standardSuccess: {
          color: "#229A16",
          backgroundColor: "#E9FCD4",
        },
        standardWarning: {
          color: "#B78103",
          backgroundColor: "#FFF7CD",
        },
        standardError: {
          color: "#B72136",
          backgroundColor: "#FFE7D9",
        },
      },
    },
  },
});

const theme = (mode) => {
  const theme = createTheme(getDesignTokens(mode));
  return responsiveFontSizes(theme);
};

export default theme;
