import time, random, csv

from playwright.sync_api import sync_playwright
from config_undetect import conf_undetected


def main():

    js_init, fingerprints = conf_undetected()

    with sync_playwright() as p:
        browser = p.chromium.launch_persistent_context(
            args=[
                '--remote-debugging-port=0',
                '--disable-extensions',
                '--disable-features=TranslateUI',
                '--disable-component-extensions-with-background-pages'],
            user_data_dir='profile_chromium',
            headless=False,
            accept_downloads=True,
            user_agent=fingerprints['user_agent'],
            locale=fingerprints["locale"],
            timezone_id=fingerprints["timezone"],
            extra_http_headers={
                "Accept-Language": fingerprints["accept_language"],
                "Sec-CH-UA": fingerprints["sec_ch_ua"],
                "Sec-CH-UA-Mobile": fingerprints["sec_ch_ua_mobile"],
                "Sec-CH-UA-Platform": fingerprints["sec_ch_ua_platform"],
            }
        )
        browser.add_init_script(js_init)
        page = browser.new_page()

        response = page.goto(url='https://rmr.muzmo.cc/genre?genre_id=39')
        print(response.status,
              response.url, sep='\n')

        data = []

        page.wait_for_load_state('domcontentloaded')

        fake_scroll(page)

        all_products = page.locator("div[class='item-song ajax-item']")
        count_products = all_products.count()

        for product_number in range(count_products):
            al_prod = all_products.nth(product_number)

            data_block = al_prod.locator("a[class='block']")
            song_title = data_block.first.inner_text().strip().replace('\n', ' | ')
            href_title = data_block.nth(0).get_attribute('href')
            data_song = al_prod.locator("td[class='song-time']")
            song_dur = data_song.locator('div').nth(0).inner_text()
            kbps = data_song.locator('div').nth(2).inner_text()

            data.append(
                {
                    'song_title': song_title,
                    'href_title': href_title,
                    'song_duration': song_dur,
                    'kbps': kbps
                }
            )

        with open('data_songs.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['song_title', 'href_title', 'song_duration', 'kbps'])

            writer.writeheader()
            writer.writerows(data)
        page.pause()
        browser.close()


# change times_scroll to collect more
def fake_scroll(page=None, times_scroll: int = 2):
    count_s = 0
    while count_s != times_scroll:
        count_s += 1
        page.mouse.wheel(0, random.randint(270, 700))
        time.sleep(random.uniform(0.3, 0.7))
        if random.random() < 0.20:
            time.sleep(random.uniform(1, 7))



if __name__ == '__main__':
    main()

