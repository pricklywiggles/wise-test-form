import '@transferwise/neptune-css/dist/css/neptune.css';
import '@transferwise/icons/lib/styles/main.min.css';
import '@transferwise/components/build/main.css';
import '@transferwise/dynamic-flows/build/main.css';
import {
  Provider,
  SnackbarProvider,
  translations as componentTranslations,
  getLangFromLocale,
  DEFAULT_LANG
} from '@transferwise/components';
import {
  DynamicFlow,
  translations as dynamicFlowsTranslations
} from '@transferwise/dynamic-flows/';

const locale = 'en';
const lang = getLangFromLocale(locale) || 'en';
console.log({ lang });
const i18n = {
  locale,
  messages: {
    ...componentTranslations[lang],
    ...dynamicFlowsTranslations[lang]
  }
};

const TwForm = () => {
  return (
    <Provider i18n={i18n}>
      <SnackbarProvider>
        <DynamicFlow
          flowUrl="/api/hello"
          fetcher={(...args) => fetch(...args)}
          onClose={(result) => {
            console.log('Flow exited with', result);
          }}
          onError={(error, statusCode) => {
            console.error('Flow Error:', error, 'status code', statusCode);
          }}
        />
      </SnackbarProvider>
    </Provider>
  );
};

export { TwForm };
