module ApplicationHelper
  def errors_block(errors)
    html = ""
    if errors
      html = "<ul>"

      errors.each do |error|
        html += "<li>"
        html += "#{error}"
        html += "</li>"
      end
      
      html += "</ul>"
    end
    html.html_safe
  end

end
