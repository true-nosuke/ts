// インターネット時報 UI

import Timesignal, { timesignalOptions } from './timesignal/timesignal'

// インターネット時報
let timesignal: Timesignal | null = null;

document.addEventListener('DOMContentLoaded', function () {
  const chk24Hour = <HTMLInputElement>document.getElementById('chk24Hour');
  const chkMute = <HTMLInputElement>document.getElementById('chkMute');
  const chkStop = <HTMLInputElement>document.getElementById('chkStop');
  const rngVolume = <HTMLInputElement>document.getElementById('rngVolume');
  const txtVolume = <HTMLInputElement>document.getElementById('txtVolume');
  const rdoGoogle = <HTMLInputElement>document.getElementById('rdoGoogle');
  const rdoYukkuri = <HTMLInputElement>document.getElementById('rdoYukkuri');
  const rdoZunda = <HTMLInputElement>document.getElementById('rdoZunda');
	const chkLocalClock = <HTMLInputElement>document.getElementById('chkLocalClock');
	const selTick = <HTMLSelectElement>document.getElementById('selTick');
	const selTick2 = <HTMLSelectElement>document.getElementById('selTick2');
	const selChime = <HTMLSelectElement>document.getElementById('selChime');

	const edtDisplayTime = <HTMLInputElement>document.getElementById('display_time');
  const divAudios = <HTMLDivElement>document.getElementById('audios');

  // パラメータ＆初期設定
	const options: timesignalOptions = {
		b24Hour: false,
		bSummerTime: false,
		bMute: false,
		bStop: false,
		nVoice: 0,
		nVolume: 100,
		nInterval: 9,
		useLocalClock: false,
		nTick: 0,
		nTick2: 0,
		nChime: 0
	};
	const param = new Map();
	const pair = location.search.substring(1).split('&');
	for(let i = 0; i < pair.length; i++) {
		const keyval = pair[i].split('=');
		param.set(keyval[0], keyval[1]);
	}
  if(param.get("h") === "24") {
		chk24Hour.checked = true;
		options.b24Hour = true;
	} else {
		chk24Hour.checked = false;
  }
	if(param.get("m") === "1") {
		chkMute.checked = true;
		options.bMute = true;
	} else {
		chkMute.checked = false;
  }
  switch(Number(param.get("v"))) {
    case 1:
      rdoYukkuri.checked = true;
  		options.nVoice = 1;
      break;
    case 2:
      rdoZunda.checked = true;
  		options.nVoice = 2;
      break;
    default:
      rdoGoogle.checked = true;
      break;
  }

	// 時計ソース（src=local|net）
	const src = (param.get("src") || '').toLowerCase();
	if(src === 'local') {
		options.useLocalClock = true;
		if(chkLocalClock) chkLocalClock.checked = true;
	} else if(src === 'net') {
		options.useLocalClock = false;
		if(chkLocalClock) chkLocalClock.checked = false;
	} else {
		// 既定: ネットワーク補正（チェックなし）
		if(chkLocalClock) chkLocalClock.checked = false;
	}

	// 音源選択（tick=0|1, tick2=0|1, chime=0|1）
	const tickParam = param.get("tick");
	if(tickParam !== null) {
		const tickVal = Number(tickParam);
		if(!isNaN(tickVal) && tickVal >= 0 && tickVal < 2) {
			options.nTick = tickVal;
			if(selTick) selTick.value = String(tickVal);
		}
	}

	const tick2Param = param.get("tick2");
	if(tick2Param !== null) {
		const tick2Val = Number(tick2Param);
		if(!isNaN(tick2Val) && tick2Val >= 0 && tick2Val < 2) {
			options.nTick2 = tick2Val;
			if(selTick2) selTick2.value = String(tick2Val);
		}
	}

	const chimeParam = param.get("chime");
	if(chimeParam !== null) {
		const chimeVal = Number(chimeParam);
		if(!isNaN(chimeVal) && chimeVal >= 0 && chimeVal < 2) {
			options.nChime = chimeVal;
			if(selChime) selChime.value = String(chimeVal);
		}
	}

	let volume = Number(param.get("vol"));
	if(isNaN(volume)) {
		volume = 100;
	}
	if(volume < 0 || volume >= 100) {
		volume = 100;
  }
	rngVolume.value = volume.toString();
	txtVolume.value = volume.toString();
	options.nVolume = volume;

	// インターネット時報 初期化
  timesignal = new Timesignal(divAudios, options, (strTime) => {
		edtDisplayTime.value = strTime;
	});

	// イベントリスナ
  chk24Hour.addEventListener('click', function () {
		options.b24Hour = chk24Hour.checked;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  chkMute.addEventListener('click', function () {
		options.bMute = chkMute.checked;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  chkStop.addEventListener('click', function () {
		options.bStop = chkStop.checked;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  rdoGoogle.addEventListener('click', function () {
		options.nVoice = 0;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  rdoYukkuri.addEventListener('click', function () {
		options.nVoice = 1;
		if(timesignal) {
			timesignal.options = options;
		}
  });
  rdoZunda.addEventListener('click', function () {
		options.nVoice = 2;
		if(timesignal) {
			timesignal.options = options;
		}
  });
	if(chkLocalClock) {
		chkLocalClock.addEventListener('click', function () {
			options.useLocalClock = chkLocalClock.checked;
			if(timesignal) {
				timesignal.options = options;
			}
		});
	}

	// Tick音源選択
	if(selTick) {
		selTick.addEventListener('change', function () {
			options.nTick = Number(selTick.value);
			if(timesignal) {
				timesignal.options = options;
			}
		});
	}

	// Tick2音源選択
	if(selTick2) {
		selTick2.addEventListener('change', function () {
			options.nTick2 = Number(selTick2.value);
			if(timesignal) {
				timesignal.options = options;
			}
		});
	}

	// Chime音源選択
	if(selChime) {
		selChime.addEventListener('change', function () {
			options.nChime = Number(selChime.value);
			if(timesignal) {
				timesignal.options = options;
			}
		});
	}

	rngVolume.addEventListener('change', function() {
		txtVolume.value = rngVolume.value;
		options.nVolume = Number(rngVolume.value);
		if(timesignal) {
			timesignal.options = options;
		}
	});
});
