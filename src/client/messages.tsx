import * as React from "react";
import { FC } from "react";

export const CaveatMessage: FC = ({}) => {
  const lines = [
    "観光の様子を実況配信することは禁止とさせていただきます。",
    "観光の様子を動画等に撮影・録音することは禁止とさせていただきます。",
    "SNS 等で、あたかも本物のにじさんじサーバー・ホロライブサーバーにログインしたとの誤解を与えるような情報発信はしないで下さい。",
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

export const HowToLoginMessage: FC = ({}) => {
  return (
    <>
      <h2>ログイン方法</h2>
      <div className="text">
        <ul>
          <li>
            Minecraft Java Edition
            でログインして下さい。バージョンは最新のものをお勧めしますが、古いバージョンでもログインは可能です。
          </li>
          <li>サーバーのアドレスは public.giji34.world です。</li>
          <li>
            サーバーはホワイトリスト制となっています。お手数ですがログイン前に、管理者{" "}
            <a href="https://twitter.com/kbinani">@kbinani</a> 宛に Minecraft
            のプレイヤー名を DM でお伝え下さい。
          </li>
        </ul>
      </div>
    </>
  );
};

export const InstructionMessage: FC = ({}) => {
  const lines = [
    "ゲームモードはアドベンチャーモードになっています。",
    "ログインするとロビーにスポーンします。ロビーに設置されたネザーゲートから再現ワールドに入って下さい。",
    "サーバーからログアウトして再接続すると、最初のロビーに戻されます。地形にハマった、などトラブルの際、管理人が不在の場合は再接続をお試し下さい。",
  ];
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
