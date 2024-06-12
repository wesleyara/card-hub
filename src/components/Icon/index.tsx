import { SVGProps } from "react";

export function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M84.438 20.78c-.414.005-.824.01-1.25.032c-2.273.113-4.742.477-7.376 1.094C65.28 24.373 52.858 31.236 42.094 42C31.33 52.763 24.467 65.186 22 75.72c-2.467 10.532-.738 18.23 3.75 22.718c3.93 3.93 10.33 5.763 18.938 4.5c-1.82-5.496-1.757-11.592-.407-17.282c2.182-9.194 7.5-18.247 15.314-26.062s16.836-13.13 26.03-15.313c2.3-.544 4.695-.876 7.064-.968c3.515-.135 7.022.307 10.312 1.407c1.3-8.664-.52-15.082-4.47-19.032c-3.154-3.156-7.896-4.97-14.093-4.907zm9.937 41.126c-.332-.006-.694.01-1.063.032c-.98.06-2.08.23-3.343.53c-5.057 1.2-11.542 4.728-17.157 10.344c-5.616 5.617-9.145 12.1-10.344 17.157c-1.2 5.054-.25 7.718 1.03 9l.344.343l.312.406l41.344 51.25c4.423-9.226 10.846-18.254 19.03-26.44c8.186-8.183 17.214-14.607 26.44-19.03L99.72 64.156l-.407-.312l-.344-.344c-.84-.84-2.273-1.552-4.595-1.594zm85.22 55.344a31 31 0 0 0-2.376.03c-2.168.115-4.54.465-7.064 1.064c-10.095 2.394-22.042 9.042-32.406 19.406s-17.012 22.31-19.406 32.406s-.727 17.367 3.5 21.594l.344.375l.312.375l3.75 4.625c.046-.207.076-.418.125-.625c3.576-15.268 12.593-30.935 26.125-44.47c13.467-13.468 29.05-22.452 44.25-26.06l-4.25-3.44l-.375-.343l-.375-.343c-2.774-2.775-6.828-4.448-12.156-4.594zm31.186 25.656c-2.895-.01-6.086.374-9.56 1.188c-11.122 2.604-24.185 9.838-35.5 21.156c-11.318 11.318-18.552 24.378-21.157 35.5c-2.117 9.036-1.316 16.178 1.656 21.125l.093.156l48.375 59.94c6.217-18.252 17.894-36.74 34.218-53.064c16.332-16.33 34.835-28.003 53.094-34.22L219.75 144.5c-2.557-1.017-5.562-1.583-8.97-1.594zm99.25 65.344c-.697.007-1.41.027-2.124.063c-3.814.188-7.85.798-12.125 1.812c-17.098 4.056-36.72 15.005-53.686 31.97c-16.965 16.963-27.913 36.586-31.97 53.686c-4.055 17.102-1.384 30.74 6.94 39.064l.342.344l.313.406l.31.406a93 93 0 0 1 1.907-11c5.25-22.406 18.652-45.87 38.907-66.125s43.718-33.658 66.125-38.906c3.702-.87 7.4-1.513 11.06-1.907l-.436-.344l-.406-.314l-.344-.344c-5.853-5.852-14.346-8.918-24.813-8.812zm35.22 27.97c-4.95-.034-10.325.6-16.03 1.936c-18.262 4.278-39.118 15.898-57.158 33.938s-29.66 38.896-33.937 57.156c-3.19 13.618-2.38 25.28 1.97 34.063l55.874 69.28c.46-3.185 1.058-6.378 1.81-9.593c6.32-26.98 22.565-55.408 47.126-79.97c24.56-24.56 52.96-40.773 79.938-47.092c2.055-.482 4.108-.89 6.156-1.25l-67.53-54.5h-.033c-5.132-2.575-11.256-3.924-18.187-3.97zm103.094 75.5c-.947.005-1.907.017-2.875.06c-5.166.236-10.637 1.008-16.345 2.345c-22.832 5.348-48.686 19.78-71.03 42.125c-22.347 22.345-36.778 48.2-42.126 71.03c-5.35 22.833-1.77 41.703 9.905 53.376c7.86 7.862 18.996 12.047 32.406 12.313a47 47 0 0 1-2-1.876c-13.45-13.452-16.224-33.735-11.5-53.906c4.726-20.172 16.757-41.163 34.908-59.313c18.15-18.15 39.172-30.213 59.343-34.938c5.044-1.18 10.086-1.898 15.033-2.093c14.84-.586 28.754 3.505 38.843 13.594a43 43 0 0 1 1.938 2.062c-.245-13.438-4.44-24.595-12.313-32.47c-8.207-8.207-19.98-12.4-34.186-12.31zm8.28 47.717c-.65.005-1.3.032-1.968.063c-3.564.167-7.37.687-11.375 1.625c-16.024 3.754-34.44 14.003-50.374 29.938c-7.822 7.822-14.263 16.238-19.25 24.687a91 91 0 0 1 5.438-5.938c17.012-17.01 38.125-24.96 53.22-21.5c-5.877 2.765-11.803 6.865-17.158 12.22c-16.19 16.19-21.17 37.454-11.125 47.5c7.735 7.733 22.152 6.587 35.75-1.75c-3.07 4.568-6.748 9.03-10.967 13.25c-18.512 18.51-41.876 26.32-57.063 20.343c7.814 6.11 19.617 7.906 34.156 4.5c16.025-3.754 34.44-14.003 50.375-29.938s26.185-34.35 29.94-50.375c3.752-16.024 1.195-28.71-6.5-36.406c-5.413-5.41-13.32-8.293-23.095-8.22z"
      ></path>
    </svg>
  );
}
