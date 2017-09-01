require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require 'byebug'
class ControllerBase
  attr_reader :req, :res, :params
  attr_accessor :session

  # Setup the controller
  def initialize(req, res)
    @req = req
    @res = res
    @params = req.params
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    !!@already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    raise "Content already rendered" if already_built_response?
    @res.status = 302
    @res.location = url
    @already_built_response = true
    session.store_session(@res)
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise "Content already rendered" if already_built_response?
    @res['Content-Type'] = content_type
    @res.body = content.split("")
    @already_built_response = true
    session.store_session(@res)
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    template_dir = "#{File.dirname(__FILE__)}/../views/"
    template_dir += "#{self.class.name.underscore}/#{template_name}.html.erb"
    html = File.read(template_dir)

    render_content(ERB.new(html).result(binding), "text/html")
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
  end
end
