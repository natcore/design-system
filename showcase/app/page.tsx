import { List } from '@natcore/design-system-react';

export default function Home() {
  return (
    <article>
      <h1>Welcome to Natcore Design System 👩‍💻</h1>
      <p>
        Natcore Design System is a personal design system created by Natalie
        Basille, tailored to make your web development process more efficient,
        consistent, and enjoyable. It is built on top of the popular{' '}
        <a href='https://tailwindcss.com/' target='_blank'>
          Tailwind CSS
        </a>
        framework and includes a collection of css utilities and components that
        can be used on any html element. On top of that, it also includes a
        collection of reusable React, Vue (coming soon), and Svelte (coming
        soon) components.
      </p>
      <h2>Core Features 🌟</h2>
      <List.UL>
        <List.Item>
          <span className='font-bold'>Tailwind CSS:</span> NatCore uses{' '}
          <a href='https://tailwindcss.com/' target='_blank'>
            Tailwind CSS
          </a>{' '}
          as its core library, giving you access to a powerful and customizable
          utility-first CSS framework.
        </List.Item>
        <List.Item>
          <span className='font-bold'>Philosophy:</span> NatCore is built on a
          philosophy of primitives, library-agnosticism, and accessibility,
          ensuring that it can be used in a wide variety of contexts and with
          different technologies and frameworks.
        </List.Item>
        <List.Item>
          <span className='font-bold'>Framework specific Components:</span>{' '}
          NatCore comes with a collection of React, Vue (coming soon), and
          Svelte (coming soon) components that are built on top of the core
          library.
        </List.Item>
      </List.UL>
      {/* <h2>Getting Started 🚴‍♂️</h2> */}
    </article>
  );
}
