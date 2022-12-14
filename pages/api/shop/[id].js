import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    console.log("PATCH 호출!!");
    const {
      body: {
        data: { shopName, shopMenu, shopPrice },
      },
      query: { id },
    } = req;

    console.log("데이터 파싱됨");
    const result = await client.shop.update({
      data: {
        shopName,
        shopMenu,
        shopPrice: parseInt(shopPrice),
      },
      where: {
        id: +id,
      },
    });
    console.log("업데이트 성공");
    res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    console.log("DELETE 호출!!");
    const {
      query: { id },
    } = req;

    const result = await client.shop.delete({
      where: {
        id: +id,
      },
    });
    console.log("삭제 완료");
    res.status(200).json(result);
  }
}

// id를 사용할때 +id 형태로 사용하는 것은, 받은 id가 숫자인지 확실하지 않기 때문에
// 숫자로 변환시키기 위해 +를 붙여준다.