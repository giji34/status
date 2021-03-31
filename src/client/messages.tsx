import * as React from "react";
import { FC } from "react";
import { ServerEdition } from "../share/types";

export const CaveatMessage: FC = ({}) => {
  const lines = [
    "観光の様子を実況配信することは禁止とさせていただきます。",
    "観光の様子を動画に撮影、または録音することは禁止とさせていただきます。",
    "観光の様子のスクリーンショットを SNS 等でシェアしていただいてもかまいません。ただし、あたかも本物のにじさんじサーバー・ホロライブサーバーにログインしたとの誤解を与えるような情報発信はしないで下さい。",
    "その他、本プロジェクトのメンバーや、にじさんじ関係者、ホロライブ関係者、他の方の迷惑になる行為はしないで下さい。",
  ];
  return (
    <>
      <h2>禁止事項</h2>
      <div className="text">
        <ul>
          {lines.map((l, i) => (
            <li key={i}>{l}</li>
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
      <h2>エディションについて</h2>
      <div className="text">
        <ul>
          <li>観光専用サーバーは Java 版、統合版を用意しています。</li>
          <li>以下のボタンから参加したいエディションを選んで下さい。</li>
        </ul>
      </div>
      <div style={{ display: "flex", marginBottom: 50 }}>
        <EditionSelectButton
          title={"Java 版"}
          onClick={() => onSelect("java")}
          selected={edition === "java"}
        />
        <EditionSelectButton
          title={"統合版"}
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
  const kJETailLines = [
    "Java 版のバージョンは最新のものをお使いください。",
    "Fabric や Forge 等の mod loader をお使いの場合、接続できない場合があります。",
  ];
  const kBEHeadLines = [
    "Nintendo Switch からはログインできません。ご注意ください。",
  ];
  const kBETailLines = [
    "にじ鯖・ホロ鯖・旧ホロ鯖の再現ワールドのうち、どれか一つだけが稼働しています。下記のサーバー稼働状況を見て、ログインしたいサーバーが稼働している時にログインして下さい。",
  ];
  const headLines = edition === "java" ? [] : kBEHeadLines;
  const tailLines = edition === "java" ? kJETailLines : kBETailLines;
  const host = "public.giji34.world";
  const port = "19132";
  return (
    <>
      <h2>ログイン方法</h2>
      <div className="text">
        <ul>
          {headLines.map((l, i) => (
            <li key={i}>
              <span className="warning">{l}</span>
            </li>
          ))}
          {edition === "java" && (
            <li>
              サーバーアドレスは
              <span className="pre">{host}</span>です。
            </li>
          )}
          {edition === "bedrock" && (
            <li>
              サーバーアドレスは
              <span className="pre">{host}</span>です。ポートは
              <span className="pre">{port}</span>です。
            </li>
          )}
          <li>
            サーバーはホワイトリスト制となっています。お手数ですがログイン前に、以下の
            3 つの項目を管理者&nbsp;
            <a href="https://twitter.com/kbinani">@kbinani</a>&nbsp;宛に Twitter
            の DM でお伝え下さい。
            <ul>
              <li>Minecraft のプレイヤー名</li>
              <li>Java 版・統合版のどちらを観光したいか</li>
              <li>にじ鯖・ホロ鯖・旧ホロ鯖のどの再現ワールドを観光したいか</li>
            </ul>
          </li>
          {tailLines.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const InstructionMessage: FC<{ edition: ServerEdition }> = ({
  edition,
}) => {
  const baseLines = ["ゲームモードはアドベンチャーモードになっています。"];
  const jeLines = [
    "ログインするとロビーにスポーンします。ロビーに設置されたネザーゲートから再現ワールドに入って下さい。",
    "サーバーからログアウトして再接続すると、最初のロビーに戻されます。地形にハマった、などトラブルの際、管理人が不在の場合は再接続をお試し下さい。",
  ];
  const beLines = ["難易度はピースフルになっています。"];
  const lines = [...baseLines, ...(edition === "java" ? jeLines : beLines)];
  return (
    <>
      <h2>サーバー内についてのご案内</h2>
      <div className="text">
        <ul>
          {lines.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
