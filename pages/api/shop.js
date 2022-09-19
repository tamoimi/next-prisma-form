import client from "../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출!!");

    const {
      body: {
        data: { shopName, shopMenu, shopPrice },
      },
    } = req;

    console.log("백엔드 로그: ", shopName, shopMenu, shopPrice);

    const result = await client.shop.create({
      data: {
        shopName,
        shopMenu,
        shopPrice: parseInt(shopPrice),
      },
    });

    res.status(200).json(result);
  }

  if (req.method === "GET") {
    console.log("get 호출!!");
    const { shopName } = req.query;

    const result = await client.shop.findUnique({
      select: {
        id: false,
        shopName: true,
        shopMenu: true,
        shopPrice: true,
      },
      where: {
        shopName: shopName,
      },
    });
    res.status(200).json(result);
  }
}

//여기에서 .json의 역할은 <- 이곳으로 값을 넣겠다

//key:value(같으면 생략 가능)
