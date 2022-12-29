from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


# current_id = 2
data = [
    {
        "prevLesson_id": 0,
        "lesson_id": 1,
        "nextLesson_id": 2,
        "name": "Chef's Knife",
        "image": "../static/imgs/chef_knife.png",
        "food-imgs": ["../static/imgs/salmon.png", "../static/imgs/veg.png"],
        "facts": ["Curved blade allows for rocking back and forth", "Heavy duty chopping, like vegetables or salmon", "The most versatile knife"],
        "ht": 12,
    },
    {
        "prevLesson_id": 1,
        "lesson_id": 2,
        "nextLesson_id": 3,
        "name": "Paring Knife",
        "image": "../static/imgs/paring_knife.png",
        "food-imgs": ["../static/imgs/avo.png", "../static/imgs/apple.png"],
        "facts": ["Small blade means the knife is light in the hand", "Intended for more delicate work with greater control, such as peeling, trimming, and removing seeds"],
        "ht": 8,
    },
    {
        "prevLesson_id": 2,
        "lesson_id": 3,
        "nextLesson_id": 4,
        "name": "Utility Knife",
        "image": "../static/imgs/utility_knife.png",
        "food-imgs": ["../static/imgs/tomato.png", "../static/imgs/salami.png"],
        "facts": ["Features scalloped edges and blades that are slightly longer than standard paring knives", "Good for dicing smaller vegetables, such as shallots or cured meat items like salami"],
        "ht": 10,
    },
    {
        "prevLesson_id": 3,
        "lesson_id": 4,
        "nextLesson_id": 5,
        "name": "Bread Knife",
        "image": "../static/imgs/bread_knife.png",
        "food-imgs": ["../static/imgs/roll.png", "../static/imgs/bread.png"],
        "facts": ["Serrated blade good for food that is hard on outside and soft on inside, like baked goods", "Most feature offset handles to prevent the user’s knuckles from hitting the cutting board"],
        "ht": 11,
    },
    {
        "prevLesson_id": 4,
        "lesson_id": 5,
        "nextLesson_id": 6,
        "name": "Carving Knife",
        "image": "../static/imgs/carving_knife.png",
        "food-imgs": ["../static/imgs/steak.png", "../static/imgs/chicken.png"],
        "facts": ["Longest and narrowest blades of all the knives", "Thin knife enables smooth uniform slices", "Suited for cutting meats, like poultry, beef, and pork, among others"],
        "ht": 12,
    },
    {
        "prevLesson_id": 5,
        "lesson_id": 6,
        "nextLesson_id": 7,
        "name": "Boning Knife",
        "image": "../static/imgs/boning_knife.png",
        "food-imgs": ["../static/imgs/bone.png", "../static/imgs/streaky-meat.png"],
        "facts": ["Its slim, narrow profile enables precise cutting and versatile manoeuverabilit", "Cuts between joints and removes cartilage thereby reducing the amount of wasted meat"],
        "ht": 9,
    },
    {
        "prevLesson_id": 6,
        "lesson_id": 7,
        "nextLesson_id": 8,
        "name": "Filleting Knife",
        "image": "../static/imgs/filleting_knife.png",
        "food-imgs": ["../static/imgs/fillet.png", "../static/imgs/fillet2.png"],
        "facts": ["Similar to a boning knife, except the blade is thinner, longer and more flexible", "Finely pointed tip helps chefs put through the skin of fish"],
        "ht": 9.5,
    },
    {
        "prevLesson_id": 7,
        "lesson_id": 8,
        "nextLesson_id": 9,
        "name": "Santoku Knife",
        "image": "../static/imgs/santoku_knife.png",
        "food-imgs": ["../static/imgs/sushi.png", "../static/imgs/raw-fish.png"],
        "facts": ["Name means “three uses” – cutting, dicing, mincing", "Long, slightly tapered blades with characteristic dimples to prevent food from sticking to the metal", "Often used to prepare raw fish"],
        "ht": 11,
    },
    {
        "prevLesson_id": 8,
        "lesson_id": 9,
        "nextLesson_id": 10,
        "name": "Butcher Knife",
        "image": "../static/imgs/butcher_knife.png",
        "food-imgs": ["../static/imgs/meat.png", "../static/imgs/steak.png"],
        "facts": ["Flat, rectangular shaped blades, sometimes with a hole so the blade can be hung when not in use", "Broad and heavy, it is great for raw meat preparation and cutting through bone"],
        "ht": 13,
    },
    {
        "prevLesson_id": 9,
        "lesson_id": 10,
        "nextLesson_id": -2,
        "name": "Butter Knife",
        "image": "../static/imgs/butter_knife.png",
        "food-imgs": ["../static/imgs/butter.png", "../static/imgs/jam.png"],
        "facts": ["Blade is slightly serrated but has limited cutting versatility", "Thickness of blade most pronounced in the middle of the blade - useful for spreading condiments"],
        "ht": 9,
    }
]

quiz_data = [
    {
        "question_id": 0,
        "type": "home",
        "question": "Are you the sharpest knife in the drawer?",
        "button_text": "Begin Quiz!",
    },
    {
        "question_id": 1,
        "type": "mc_pic",
        "question": "What knife would you use to peel a pear?",
        "answer": "op2",
        "op1": "Chef's knife",
        "op2": "Paring knife",
        "op3": "Utility knife",
        "op1_pic": "../static/imgs/chef_knife.png",
        "op2_pic": "../static/imgs/utility_knife.png",
        "op3_pic": "../static/imgs/paring_knife.png",
        "explanation": "Of the three choices, pairing knives are the smallest and slimest, enabling the precise cutting needed for peeling a pear.",
    },
    {
        "question_id": 2,
        "type": "mc_pic",
        "question": "What knife would you use to slice salami?",
        "answer": "op3",
        "op1": "Boning knife",
        "op2": "Santoku knife",
        "op3": "Utility knife",
        "op1_pic": "../static/imgs/boning_knife.png",
        "op2_pic": "../static/imgs/santoku_knife.png",
        "op3_pic": "../static/imgs/utility_knife.png",
        "explanation": "A santoku knife would be too large for the task, and a boning knife would not be used in this context.",
    },
    {
        "question_id": 3,
        "type": "mc_pic",
        "question": "What knife would you use to cut a baguette?",
        "answer": "op1",
        "op1": "Bread knife",
        "op2": "Carving knife",
        "op3": "Butter knife",
        "op1_pic": "../static/imgs/bread_knife.png",
        "op2_pic": "../static/imgs/carving_knife.png",
        "op3_pic": "../static/imgs/butter_knife.png",
        "explanation": "A carving knife would not be used in this context, and a butter knife with its slightly serated blade would be a worse choice than a bread knife.",
    },
    {
        "question_id": 4,
        "type": "mc_pic",
        "question": "What knife would you use to cut through fish skin?",
        "answer": "op3",
        "op1": "Carving knife",
        "op2": "Boning knife",
        "op3": "Filleting knife",
        "op1_pic": "../static/imgs/carving_knife.png",
        "op2_pic": "../static/imgs/boning_knife.png",
        "op3_pic": "../static/imgs/filleting_knife.png",
        "explanation": "A carving knife would not be used for such a delicate task. A filleting knife's slim profile and flexibility make it better suited for this task than a boning knife.",
    },
    {
        "question_id": 5,
        "type": "mc_pic",
        "question": "What knife would you use to make thin sashimi cuts?",
        "answer": "op2",
        "op1": "Filleting knife",
        "op2": "Paring knife",
        "op3": "Santoku knife",
        "op1_pic": "../static/imgs/filleting_knife.png",
        "op2_pic": "../static/imgs/paring_knife.png",
        "op3_pic": "../static/imgs/santoku_knife.png",
        "explanation": "A Santoku knife is suited for preparing raw fish because its dimples prevent food from sticking to the blade.",
    },
    {
        "question_id": 6,
        "type": "mc_word",
        "question": "What qualities make a butchers knife capable of cutting through bone?",
        "answer": "op1",
        "op1": "broad and heavy",
        "op2": "sharp and narrow",
        "op3": "light and precise",
        "explanation": "The broad and heavy nature of butcher knives allow them to chop through bones.",
    },
    {
        "question_id": 7,
        "type": "mc_word",
        "question": "What does 'Santukou' mean?",
        "answer": "op3",
        "op1": "well-rounded",
        "op2": "dimpled",
        "op3": "three uses",
        "explanation": "'san' means three; 'toku' means virtue or use.",
    },
    {
        "question_id": 8,
        "type": "tf",
        "question": "A paring knife could be used to chop bundles of vegetables.",
        "answer": "op2",
        "op1": "True",
        "op2": "False",
        "explanation": "False, paring knives are small and meant for delicate work, like peeling an apple.",
    },
    {
        "question_id": 9,
        "type": "tf",
        "question": "A butter knife is serated.",
        "answer": "op1",
        "op1": "True",
        "op2": "False",
        "explanation": "True, butter knives are slightly serated.",
    },
    {
        "question_id": 10,
        "type": "tf",
        "question": "A carving knife is suited for cutting between joints and through cartilage.",
        "answer": "op2",
        "op1": "True",
        "op2": "False",
        "explanation": "False, boning knives are slimmer and narrower than carving knives and are better for precise tasks like cutting between joints and through cartilage.",
    }
]

correct_answers = 0
progress = 0

# ROUTES
# Home

@app.route('/')
def frontpage():
    return render_template('frontpage.html', data=data)


@app.route('/home')
def home():
    return render_template('home.html', data=data)

# Learn


@app.route('/learn/<id>', methods=["GET", "POST"])
def learn_item(id=None):
    this_knife = []
    knife_images = []
    for knife in data:
        knife_images.append(knife["image"])
        if knife["lesson_id"] == int(id):
            print(knife["lesson_id"])
            this_knife = {
                "lesson_id": knife["lesson_id"],
                "name": knife["name"],
                "image": knife["image"],
                "facts": knife["facts"],
                "ht": knife["ht"],
                "nextLesson_id": knife["lesson_id"] + 1,
                "prevLesson_id": knife["lesson_id"] - 1,
                "food_img1": knife["food-imgs"][0],
                "food_img2": knife["food-imgs"][1],
            }
    return render_template('learn.html', data=data, knife=this_knife, id=id, progress = progress)

# Quiz
@app.route('/quiz/', methods=["GET", "POST"])
def quiz_item_1():
    return render_template('quiz.html', quiz_data = quiz_data, id = None, correct_answers = correct_answers)

@app.route('/quiz/<id>', methods=["GET", "POST"])
def quiz_item(id=None):
    return render_template('quiz.html', quiz_data = quiz_data, id = id, correct_answers = correct_answers)


# AJAX FUNCTIONS
@app.route('/update_correct_answer', methods=['GET', 'POST'])
def update_correct_answer():
    global correct_answers

    json_data = request.get_json()
    current_value = int(json_data)

    correct_answers = current_value + 1

    #send back data
    return jsonify(correct_answers = correct_answers)

@app.route('/update_progress', methods=['GET', 'POST'])
def update_progress():
    global progress

    json_data = request.get_json()
    current_value = int(json_data)
    print("value",current_value)
    print("hello")

    progress = current_value + 1
    print("process",progress)

    #send back data
    return jsonify(progress = progress)


# ajax for people.js
# @app.route('/add_name', methods=['GET', 'POST'])
# def add_name():
#     global data
#     global current_id
#
#     json_data = request.get_json()
#     name = json_data["name"]
#
#     # add new entry to array with
#     # a new id and the name the user sent in JSON
#     current_id += 1
#     new_id = current_id
#     new_name_entry = {
#         "name": name,
#         "id":  current_id
#     }
#
#     data.append(new_name_entry)
#
#     # send back the WHOLE array of data, so the client can redisplay it
#     return jsonify(data=data)


if __name__ == '__main__':
    app.run(debug=True)
