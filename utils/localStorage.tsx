import { useCallback, useEffect, useState } from 'react';
import { CustomerInfo } from '../type/CustomerInfo.type';

const LOCALSTORAGE_RATES_KEY = 'rates';

//TODO:未実装
export function useLocalStorage(): [
  customerInfo: CustomerInfo,
  setCustomerInfo: (customerInfo: CustomerInfo) => void
] {
  const customerInfo: CustomerInfo = {
    hasRakutenCard: false,
    hasRakutenMobile: false,
    hasRakutenBank: false,
    hasRakutenSecurities: false,
  };
  const [customerInfoInternal, setCustomerInfoInternal] = useState<CustomerInfo>(customerInfo);

  // クライアントでの初期レンダリング直後にローカルストレージの設定を反映
  useEffect(() => {
    if (localStorage.getItem(LOCALSTORAGE_RATES_KEY)) {
      const info = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_RATES_KEY) as string
      ) as CustomerInfo;
      setCustomerInfoInternal(info);
    }
  }, [setCustomerInfoInternal]);

  // 外部からのセッター呼び出し時にローカルストレージに値を保存する
  const setCustomerInfo = useCallback(
    (customerInfo: CustomerInfo) => {
      localStorage.setItem(LOCALSTORAGE_RATES_KEY, JSON.stringify(customerInfo));
      setCustomerInfoInternal(customerInfo);
    },
    [setCustomerInfoInternal]
  );

  return [customerInfoInternal, setCustomerInfo];
}
