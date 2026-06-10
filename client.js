const WORKER_URL = "https://trello-order-worker.off-weewish.workers.dev";

window.TrelloPowerUp.initialize({
  "card-buttons": function (t) {
    return [
      {
        text: "Generate Order",

        callback: async function (t) {

          const card = await t.card("id", "name");

          const res = await fetch(WORKER_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              cardId: card.id,
              cardName: card.name
            })
          });

          const data = await res.json();

          if (!data.success) {

            if (data.orderNo) {
              return t.alert({
                message:
                  `มีเลขออเดอร์แล้ว (${data.orderNo})`
              });
            }

            return t.alert({
              message:
                data.message || "ไม่สามารถสร้างเลขออเดอร์ได้"
            });
          }

          return t.alert({
            message:
              `สร้าง ${data.orderNo} สำเร็จ และเพิ่มข้อความแจ้งลูกค้าแล้ว`
          });

        }
      }
    ];
  }
});
