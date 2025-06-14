
let obj = {}, ddm = JSON.parse(typeof $response != "undefined" && $response.body || "{}");

const headers = $request.headers, ua = headers['User-Agent'] || headers['user-agent'], bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

const forbiddenApps = ['Rond', 'Filebar', 'Fileball', 'APTV'];
if (forbiddenApps.some(app => (ua && ua.includes(app)) || ($request.body && $request.body.includes(app)))) {
  console.log("⛔️检测到禁止 MITM 的 APP，脚本停止运行！");
  $done({});
}

const bundle = {
  'com.OfflineMusic.www': { name: 'premium', id: 'com.OfflineMusic.www.lifetime298', cm: 'sjb' },  //维克音乐
  'com.ausoco.umai': { name: 'umai_pro', id: 'umai_pro_yearly', cm: 'sja' },  //UmAI
  'camp.user.penbook': { name: 'pro', id: 'penbook.lifetime01', cm: 'sjb' },  //Penbook-智能笔记本
  'design.yugen.Flow': { name: 'pro', id: 'design.yugen.Flow.Lifetime', cm: 'sja' },  //Flow-番茄工作/专注计时器
  'com.runbuddy.prod': { name: 'premium', id: 'rb_9999_1y_1y7999', cm: 'sja' },  //Runna-马拉松训练
  'TeleprompterX': { name: 'Pro Upgrade', id: 'TPXOTP', cm: 'sjb' },  //Teleprompter
  'com.exoplanet.chatme': { name: 'premium', id: 'chatme_premium_year_trial', cm: 'sja' },  //ChatMe
  'com.reku.Counter': { name: 'plus', id: 'com.reku.counter.plus.lifetime', cm: 'sjb' },  //Counter-计步器
  'moonbox.co.il.grow': { name: 'pro', id: 'moonbox.co.il.grow.lifetime.offer', cm: 'sjb' },  //植物识别-PlantID
  'tech.miidii.MDClock': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //谜底时钟
  'com.voicedream.Voic': { name: 'standard', id: 'vd_annual_79_3daytrial', cm: 'sja' },  //声之梦
  'com.laser-focused.focus-ios': { name: 'subscribed', id: 'iap.io.masterbuilders.focus.pro_one_year', cm: 'sja' },  //Focus-专注时间管理
  'com.roehl': { name: 'Pro', id: 'habitkit_3499_lt', cm: 'sjb' },  //HabitKit/WinDiary-双件套
  'net.tengl.powertimer': { name: 'plus', id: 'powertimer.plus', cm: 'sjb' },  //元气计时-PowerTimer
  'com.reader.book': { name: 'pro', id: 'reader.lifetimeFamily.pro', cm: 'sja' },  //PureLibro
  'app.imone.OneWidget': { name: 'pro', id: 'app.imone.OneWidget.Lifetime', cm: 'sjb' },  //OneWidget-小组件
  'io.innerpeace.yiye': { name: 'Premium', id: 'io.innerpeace.yiye.lifetime.forYearly', cm: 'sja' },  //言外笔记
  'com.valo.reader': { name: 'com.valo.reader.vip1.forever', id: 'com.valo.reader.vip1.forever', nameb: 'com.valo.reader.vip2.forever', idb: 'com.valo.reader.vip2.forever', cm: 'sjb' },  //读不舍手
  'com.skysoft.removalfree': { name: 'Pro', id: 'com.skysoft.removalfree.subscription.newyearly', cm: 'sja' }  //图片消除
};

const listua = {
  'Lightune': { name: 'pro', id: 'Lightune_Pro_Year', cm: 'sja' } ,  //Lightune - AI 
  'Ai': { name: 'Pro', id: 'ai_video_year', cm: 'sja' } ,   //AI Video 
  'Funswap': { name: 'Pro', id: 'funswap_yearly', cm: 'sja' }  //AI Video 
};




let body = JSON.parse($response.body);
let url = $request.url;

if (url.includes("offerings") || url.includes("products")) {
  body = {
    offerings: {
      current_offering_id: "premium",
      offerings: [
        {
          identifier: "premium",
          serverDescription: "Premium Unlock",
          availablePackages: [
            {
              identifier: "$rc_lifetime",
              packageType: "LIFETIME",
              product: {
                identifier: "com.app.premium.lifetime",
                price: 0,
                currencyCode: "USD",
                description: "Lifetime Premium Access",
              }
            }
          ]
        }
      ]
    }
  };
}

if (url.includes("subscribers") || url.includes("subscriber_attributes")) {
  body = {
    request_date_ms: 1666666666666,
    request_date: "2025-06-14T00:00:00Z",
    subscriber: {
      entitlements: {
        premium: {
          expires_date: "2099-09-09T09:09:09Z",
          product_identifier: "com.app.premium.lifetime",
          purchase_date: "2022-02-22T22:22:22Z"
        }
      },
      first_seen: "2021-01-01T00:00:00Z",
      original_app_user_id: "$RCAnonymousID:xxxxxx",
      subscriptions: {
        "com.app.premium.lifetime": {
          billing_issues_detected_at: null,
          expires_date: "2099-09-09T09:09:09Z",
          is_sandbox: false,
          original_purchase_date: "2022-02-22T22:22:22Z",
          ownership_type: "PURCHASED",
          period_type: "lifetime",
          purchase_date: "2022-02-22T22:22:22Z",
          store: "app_store",
          unsubscribe_detected_at: null
        }
      }
    }
  };
}

$done({ body: JSON.stringify(body) });






