import * as React from "react";
import { FC, useContext, useMemo } from "react";
import { ServerEdition } from "../share/types";
import { LanguageContext, text } from "./main";
import { Translatable } from "../share/i18n";

export const CaveatMessage: FC = ({}) => {
  const lines: Translatable[] = [
    {
      jp:
        "観光の様子を配信、動画に撮影、または録音することは禁止とさせていただきます。",
      en:
        "Streaming, filming, or sound recording of the sightseeing is prohibited.",
    },
    {
      jp:
        "観光の様子のスクリーンショットを SNS 等でシェアしていただいてもかまいません。ただし、あたかも本物のにじさんじサーバー・ホロライブサーバーにログインしたとの誤解を与えるような情報発信はしないで下さい。",
      en:
        "You are welcome to share screenshots of your sightseeing on SNS and other media. However, please do not post information in such a way as to mislead people into thinking that you have logged into the real Nijisanji server or Hololive server.",
    },
    {
      jp:
        "本プロジェクトのメンバーや、にじさんじ関係者、ホロライブ関係者、その他の方の迷惑になる行為はしないで下さい。",
      en:
        "Please do not do anything that may cause trouble for the members of this project, Nijisanji staff or related parties, Hololive staff or related parties, or anyone else.",
    },
    {
      jp:
        "本プロジェクトの観光用サーバーから得られる地形データ等をファイル等に保存しないで下さい。",
      en:
        "Please do not save the terrain data and other data obtained from the server of this project in any files.",
    },
  ];
  return (
    <>
      <h2>{text({ jp: "注意事項", en: "Cautions" })}</h2>
      <div className="text">
        <ul>
          {lines.map((l, i) => (
            <li key={i}>{text(l)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const SelectEditionMessage: FC<{
  edition: ServerEdition | undefined;
  onSelect: (edition: ServerEdition) => void;
}> = ({ edition, onSelect }) => {
  return (
    <>
      <h2>{text({ jp: "エディションについて", en: "Minecraft Editions" })}</h2>
      <div className="text">
        <ul>
          <li>
            {text({
              jp: "観光専用サーバーは Java 版、統合版を用意しています。",
              en:
                "The dedicated sightseeing server is available in Java and Bedrock versions.",
            })}
          </li>
          <li>
            {text({
              jp: "以下のボタンから参加したいエディションを選んで下さい。",
              en:
                "Click on the button below to select the edition you wish to participate in.",
            })}
          </li>
        </ul>
      </div>
      <div style={{ display: "flex", marginBottom: 50 }}>
        <EditionSelectButton
          title={text({ jp: "Java 版", en: "Java Edition" })}
          onClick={() => onSelect("java")}
          selected={edition === "java"}
        />
        <EditionSelectButton
          title={text({ jp: "統合版", en: "Bedrock Edition" })}
          onClick={() => onSelect("bedrock")}
          selected={edition === "bedrock"}
        />
      </div>
    </>
  );
};

const EditionSelectButton: FC<{
  title: string;
  onClick: () => void;
  selected: boolean;
}> = ({ title, onClick, selected }) => {
  return (
    <div
      className="edition-select-button"
      data-selected={selected}
      role={"button"}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

export const HowToLoginMessage: FC<{ edition: ServerEdition }> = ({
  edition,
}) => {
  const kJETailLines: Translatable[] = [
    {
      jp: "Java 版のバージョンは最新のものでログインして下さい。",
      en: "Please login with the latest version of the Java version.",
    },
    {
      jp:
        "Fabric や Forge 等の mod loader をお使いの場合、接続できない場合があります。",
      en:
        "If you are using a mod loader such as Fabric or Forge, you may not be able to connect.",
    },
  ];
  const kBEHeadLines: Translatable[] = [
    {
      jp: "Nintendo Switch からはログインできません。ご注意ください。",
      en: "You cannot login from Nintendo Switch. Please be careful.",
    },
  ];
  const kBETailLines: Translatable[] = [
    {
      jp:
        "にじ鯖・ホロ鯖・旧ホロ鯖の再現ワールドのうち、どれか一つだけが稼働しています。下記のサーバー稼働状況を見て、ログインしたいサーバーが稼働している時にログインして下さい。",
      en:
        "Only one of the servers (Niji-server, Holo-server, or the old-Holo-server) is up and running. Please look at the server availability below and log in when the server you want to log in to is up and running.",
    },
  ];
  const headLines: Translatable[] = edition === "java" ? [] : kBEHeadLines;
  const tailLines: Translatable[] =
    edition === "java" ? kJETailLines : kBETailLines;
  const host = "public.giji34.world";
  const port = "19132";
  return (
    <>
      <h2>{text({ jp: "ログイン方法", en: "How to Login" })}</h2>
      <div className="text">
        <ul>
          {headLines.map((l, i) => (
            <li key={i}>
              <span className="warning">{text(l)}</span>
            </li>
          ))}
          {edition === "java" && (
            <li>
              <DecorateMonospace
                t={text({
                  jp: `サーバーアドレスは<pre>${host}</pre>です。`,
                  en: `The server address is <pre>${host}</pre>.`,
                })}
              />
            </li>
          )}
          {edition === "bedrock" && (
            <li>
              <DecorateMonospace
                t={text({
                  jp: `サーバーアドレスは<pre>${host}</pre>です。`,
                  en: `The server address is <pre>${host}</pre>.`,
                })}
              />
              <DecorateMonospace
                t={text({
                  jp: `ポートは<pre>${port}</pre>です。`,
                  en: `The port number is <pre>${port}</pre>.`,
                })}
              />
            </li>
          )}
          <li>
            <DMInstruction />
            <ul>
              <li>
                {text({
                  jp: "Minecraft のプレイヤー名",
                  en: "Your Minecraft player ID",
                })}
              </li>
              <li>
                {text({
                  jp: "観光したいサーバーのエディション: (Java 版・統合版)",
                  en:
                    "Edition of the server you want to visit: (Java or Bedrock)",
                })}
              </li>
              <li>
                {text({
                  jp: "観光したいサーバー: (にじ鯖・ホロ鯖・旧ホロ鯖)",
                  en:
                    "Server you want to visit: (Niji-server, Holo-server, or old-Holo-server)",
                })}
              </li>
            </ul>
          </li>
          {tailLines.map((l, i) => (
            <li key={i}>{text(l)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

const DMInstruction: FC = () => {
  const { language } = useContext(LanguageContext);
  if (language == "jp") {
    return (
      <>
        サーバーはホワイトリスト制となっています。お手数ですがログイン前に、以下の
        3 つの項目を管理者&nbsp;
        <a href="https://twitter.com/kbinani">@kbinani</a>&nbsp;宛に Twitter の
        DM でお伝え下さい。
      </>
    );
  } else {
    return (
      <>
        The server is whitelisted. Please inform the administrator of the
        following three items via Twitter DM&nbsp;
        <a href="https://twitter.com/kbinani">@kbinani</a> before logging in.
      </>
    );
  }
};

export const InstructionMessage: FC<{ edition: ServerEdition }> = ({
  edition,
}) => {
  const baseLines: Translatable[] = [
    {
      jp: "ゲームモードはアドベンチャーモードになっています。",
      en: "The game mode is set to Adventure mode.",
    },
  ];
  const jeLines: Translatable[] = [
    {
      jp:
        "ログインするとロビーにスポーンします。ロビーに設置されたネザーゲートから観光用ワールドに入って下さい。",
      en:
        "When you login, you will spawn in the lobby. Enter the sightseeing world through the nether gate in the lobby.",
    },
    {
      jp:
        "サーバーからログアウトして再接続すると、最初のロビーに戻されます。地形にハマった、などトラブルの際、管理人が不在の場合は再接続をお試し下さい。",
      en:
        "If you logout of the server and reconnect, you will be taken back to the first lobby. If you get into trouble, such as getting stuck in the terrain, or if the administrator is not available, please try to reconnect.",
    },
  ];
  const beLines: Translatable[] = [
    {
      jp: "難易度はピースフルになっています。",
      en: "The game mode is set to Peaceful mode.",
    },
  ];
  const lines = [...baseLines, ...(edition === "java" ? jeLines : beLines)];
  return (
    <>
      <h2>
        {text({
          jp: "サーバー内についてのご案内",
          en: "Information on the server",
        })}
      </h2>
      <div className="text">
        <ul>
          {lines.map((l, i) => (
            <li key={i}>{text(l)}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

type DecoratedText = { text: string; type: "normal" | "pre" };

function explodeToDecoratedText(t: string): DecoratedText[] {
  const ret: DecoratedText[] = [];
  let pivot = 0;
  while (pivot < t.length) {
    const begin = t.indexOf("<pre>", pivot);
    if (begin < 0) {
      ret.push({ text: t.substring(pivot), type: "normal" });
      break;
    }
    if (pivot < begin) {
      ret.push({ text: t.substring(pivot, begin), type: "normal" });
    }
    const end = t.indexOf("</pre>", begin);
    if (end < 0) {
      ret.push({ text: t.substring(begin + 5), type: "pre" });
      break;
    }
    ret.push({ text: t.substring(begin + 5, end), type: "pre" });
    pivot = end + 6;
  }
  return ret;
}

const DecorateMonospace: FC<{ t: string }> = ({ t }) => {
  const items: DecoratedText[] = useMemo(() => explodeToDecoratedText(t), [t]);
  return (
    <>
      {items.map((item) => {
        if (item.type === "normal") {
          return item.text;
        } else {
          return <span className="pre">{item.text}</span>;
        }
      })}
    </>
  );
};
