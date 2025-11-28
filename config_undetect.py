def conf_undetected():

    with open('js_script.js', 'r', encoding='utf-8') as f:
        js_init = f.read()

    fingerprints = {  # Windows 10/11 + Chrome 131
            "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "sec_ch_ua": '"Google Chrome";v="131", "Chromium";v="131", "Not=A?Brand";v="24"',
            "sec_ch_ua_mobile": "?0",
            "sec_ch_ua_platform": '"Windows"',
            "accept_language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "locale": "ru-RU",
            "timezone": "Europe/Moscow"
        }
    return js_init, fingerprints


