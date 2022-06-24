import Modal from 'react-modal';
import { useState } from 'react';
import { useLocalStorage } from '../../utils/localStorage';
import { CustomerInfo } from '../../type/CustomerInfo.type';
//TODO:未実装
// スタイリング
const customStyles = {
  overlay: {
    // position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  content: {
    // position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '500px',
    height: '300px',
    transform: 'translate(-50%, -50%)',
  },
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next');

const MyModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useLocalStorage();

  let hoge: CustomerInfo = customerInfo;

  // モーダルを開く処理
  const openModal = () => {
    setIsOpen(true);
    console.log('modal open');
    hoge = customerInfo;
  };

  const afterOpenModal = () => {
    // モーダルが開いた後の処理
    console.log('modal after open');
    console.log(customerInfo);
    console.log(hoge);
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsOpen(false);
    //TODO:親に対してpropsを渡すような処理を考える
  };

  const saveCustomerInfo = () => {
    setCustomerInfo(hoge);
  };

  return (
    <>
      <button onClick={openModal}>会員情報設定</button>
      <Modal
        // isOpenがtrueならモダールが起動する
        isOpen={modalIsOpen}
        // モーダルが開いた後の処理を定義
        onAfterOpen={afterOpenModal}
        // モーダルを閉じる処理を定義
        onRequestClose={closeModal}
        // スタイリングを定義
        style={customStyles}
      >
        <h2>Hello</h2>
        {/* <input type="checkbox">楽天プレミアム</input> */}
        <input
          type="checkbox"
          value="hoge"
          name="hasRakutenCard"
          defaultChecked={hoge.hasRakutenCard}
          onChange={(e) => {
            console.log(e);
            hoge.hasRakutenCard = !hoge.hasRakutenCard;
          }}
        ></input>{' '}
        <label>rakuten</label>
        <button onClick={saveCustomerInfo}>保存</button>
        <button onClick={closeModal}>閉じる</button>
      </Modal>
    </>
  );
};

export default MyModal;
