from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class MainForm(FlaskForm):
    seriesname = StringField('TV Series Name', validators=[DataRequired()])
    submit = SubmitField('Search')
