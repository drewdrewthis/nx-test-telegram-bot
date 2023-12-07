import { safeMarkdown } from './safeMarkdown';

function walletCreateSuccess(props: { address: string; privateKey: string }) {
  const { address, privateKey } = props;
  // eslint-disable-next-line no-useless-escape
  return safeMarkdown(
    `*Congratulations!* Your user and wallet were successfully created.\n\n*Address:* ${address}\n\n*Private Key:* ${privateKey}\n\nPlease store this information safely.`
  );
}

export const MessageGenerators = {
  walletCreateSuccess,
};
