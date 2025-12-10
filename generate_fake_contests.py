
import random
from datetime import datetime, timedelta

def generate_contest_data(num_contests=100):
    platforms = {
        "codeforces": {"abbr": "CF", "class": "platform-cf"},
        "atcoder": {"abbr": "AC", "class": "platform-ac"},
        "codechef": {"abbr": "CC", "class": "platform-cc"},
        "leetcode": {"abbr": "LC", "class": "platform-lc"},
    }
    
    difficulties = ["★☆☆", "★★☆", "★★★"]
    durations = ["1h", "1h 30m", "2h", "2h 30m", "3h"]
    max_ratings = ["+100", "+120", "+145", "+180", "+200"]
    
    contest_html = []
    base_date = datetime.now() + timedelta(days=2) # Start 2 days from now

    for i in range(1, num_contests + 1):
        platform_name = random.choice(list(platforms.keys()))
        platform_info = platforms[platform_name]
        
        title = f"{platform_name.capitalize()} Contest #{i}"
        description = f"A challenging contest for {platform_name} enthusiasts."
        
        contest_date = base_date + timedelta(days=i*random.randint(1, 3))
        display_date = contest_date.strftime("%b %d, %H:%M UTC")
        days_away = (contest_date - datetime.now()).days
        if days_away == 0: display_time_diff = "Today"
        elif days_away == 1: display_time_diff = "Tomorrow"
        else: display_time_diff = f"In {days_away} days"

        duration = random.choice(durations)
        difficulty = random.choice(difficulties)
        max_rating = random.choice(max_ratings)

        html = f"""
                    <div class="contest-card bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800 animate-fade-in" data-platform="{platform_name}">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <div class="{platform_info['class']} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">{platform_info['abbr']}</div>
                                <div>
                                    <h3 class="text-lg font-bold text-white">{title}</h3>
                                    <p class="text-gray-500">{description}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm text-green-400 font-medium">{display_time_diff}</div>
                                <div class="text-xs text-gray-500">{display_date}</div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-3 gap-4 mb-4 border-t border-b border-gray-800 py-4">
                            <div class="text-center border-r border-gray-800">
                                <div class="text-2xl font-bold text-white">{duration}</div>
                                <div class="text-xs text-gray-500">Duration</div>
                            </div>
                            <div class="text-center border-r border-gray-800">
                                <div class="text-2xl font-bold text-yellow-500">{difficulty}</div>
                                <div class="text-xs text-gray-500">Difficulty</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-500">{max_rating}</div>
                                <div class="text-xs text-gray-500">Max Rating</div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between mt-4">
                            <a href="#" class="text-gray-400 hover:text-white font-medium flex items-center gap-1 transition-colors">
                                View Details <span class="text-green-500">→</span>
                            </a>
                            <button class="add-to-calendar bg-green-600 text-black px-5 py-2.5 rounded-lg font-bold hover:bg-green-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all" 
                                    data-contest-id="{platform_name}-{i}"
                                    data-contest-title="{title}"
                                    data-contest-date="{display_date}">
                                📅 Add to Calendar
                            </button>
                        </div>
                    </div>
        """
        contest_html.append(html)
        
    return "\n".join(contest_html)

if __name__ == "__main__":
    fake_data = generate_contest_data(100) # Generate 100 fake contests
    with open("fake_contests_data.html", "w") as f:
        f.write(fake_data)
