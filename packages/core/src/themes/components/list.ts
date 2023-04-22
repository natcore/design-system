import { PluginAPI } from 'tailwindcss/types/config';

export default (theme: PluginAPI['theme']) => ({
  '.list': {
    display: 'flex',
    flexDirection: 'column',
    gap: theme('spacing.2')!,
    padding: '0',
    margin: '0',
    listStyle: 'none',

    '&.list-disc': {
      '.list-item': {
        '&::before': {
          content: '"•"',
          display: 'inline-block',
          fontSize: '1.875rem',
          paddingRight: '0.5rem',
          marginLeft: '-20px',
          width: '20px',
          height: '20px',
          position: 'relative',
          top: '-12px',
          verticalAlign: 'top',
        },

        marginLeft: '20px',
        padding: '0',
        paddingRight: '20px',
        lineHeight: theme('lineHeight.tight')!,
      },
    },

    // '&.list-decimal': {
    //   listStyleType: 'decimal',
    // },

    '> .list-item': {
      display: 'block',
      padding: theme('spacing.2')!,
      margin: '0',
      cursor: 'pointer',
      width: theme('width.full')!,
      borderRadius: theme('borderRadius.DEFAULT')!,
      lineHeight: theme('lineHeight.tight')!,
      '&:hover,&:focus': {
        background: theme('colors.gray.100')!,
      },
    },

    '&.list-primary': {
      '> .list-item.active': {
        backgroundColor: 'var(--primary)',
        color: 'var(--primaryContrast)',
      },
    },

    '&.list-secondary': {
      '> .list-item.active': {
        backgroundColor: 'var(--secondary)',
        color: 'var(--secondaryContrast)',
      },
    },

    '&.list-tertiary': {
      '> .list-item.active': {
        backgroundColor: 'var(--tertiary)',
        color: 'var(--tertiaryContrast)',
      },
    },

    '&.list-warning': {
      '> .list-item.active': {
        backgroundColor: 'var(--warning)',
        color: 'var(--warningContrast)',
      },
    },

    '&.list-danger': {
      '> .list-item.active': {
        backgroundColor: 'var(--danger)',
        color: 'var(--dangerContrast)',
      },
    },
  },
});
