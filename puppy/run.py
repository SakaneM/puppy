
#
#
#

# comment out
# from pegpy.origami.arare import compile

from pathlib import Path
from flask import Flask, render_template, send_file, request, Response
from puppy import transpile


def getRootPath(subdir='data'):
    return Path(__file__).parent.absolute() / subdir


def ext():
    return 'py'


def uid():
    return 'kkuramitsu'


app = Flask(__name__, template_folder='client/static')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/<path:d>')
def dist(d):
    path = getRootPath() / 'p' / d  # / ('index.md')
    if path.exists():
        return render_template('index2.html', message=d)
    return send_file(f'client/static/{d}')

# sumomo


@app.route('/setting/<path:d>')
def dist_settings(d):
    if '/' in d:
        d = d.split('/')[0]
    path = getRootPath() / 'p' / d / ('setting.json')
    return send_file(str(path))


@app.route('/problem/<path:d>')
def dist_problem(d):
    path = getRootPath() / 'p' / d / ('index.md')
    return send_file(str(path))


@app.route('/sample/<path:d>')
def dist_code(d):
    file = getRootPath() / 'u' / uid() / (d.replace('/', '-') + '.py')
    if file.exists():
        return send_file(str(file))
    path = getRootPath() / 'p' / d / ('sample.py')
    return send_file(str(path))


def send_static_file(path1, path2):
    return send_file(f'client/static/{path1}/{path2}')


@app.route('/audio/<path:d>')
def audio_dist(d):
    return send_static_file('audio', d)


@app.route('/image/<path:d>')
def image_dist(d):
    return send_static_file('image', d)


@app.route('/js/<path:d>')
def js_dist(d):
    return send_static_file('js', d)


@app.route('/sample/<path:d>')
def sample_dist(d):
    return send_static_file('sample', d)


@app.route('/compile', methods=['POST'])
def transcompile():
    inputText = request.data
    # if '(ArareCode)' in inputText:
    #   code = inputText
    # else:
    #   code = compile(inputText)
    return Response(transpile(inputText.decode('utf-8')), mimetype='application/javascript')


def main():
    app.run(host='0.0.0.0', port=8080, debug=True)


if __name__ == '__main__':
    main()
