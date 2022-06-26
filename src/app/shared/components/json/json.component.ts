import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html'
})
export class JsonComponent implements OnInit, OnChanges {

  @Input()
  json: any;

  @Input()
  showLineNumbers = true;

  @Input()
  padding = 4;

  innerHTML: string;

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  private refresh(): any {
    try {
      /**
       * check and try to parse value if it's not an object
       * if it fails to parse which means it is an invalid JSON
       */
      this.innerHTML = this.applyColors(
        typeof this.json === 'object' ? this.json : JSON.parse(this.json)
      );
    } catch (e) {
      this.innerHTML = this.applyColors({ error: 'Invalid JSON' });
    }
  }

  private applyColors(obj: any): string {
    // line number start from 1
    let line = 1;

    if (typeof obj != 'string') {
      obj = JSON.stringify(obj, undefined, 3);
    }

    /**
     * Converts special characters like &, <, > to equivalent HTML code of it
     */
    obj = obj.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    /* taken from https://stackoverflow.com/a/7220510 */

    /**
     * wraps every datatype, key for e.g
     * numbers from json object to something like
     * <span class="number" > 234 </span>
     * this is why needed custom themeClass which we created in _global.css
     * @return final bunch of span tags after all conversion
     */
    obj = obj.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match: any) => {
        // class to be applied inside pre tag
        let themeClass = 'text-blue-500';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            themeClass = 'text-gray-200';
          } else {
            themeClass = 'text-green-500';
          }
        } else if (/true|false/.test(match)) {
          themeClass = 'text-orange-500';
        } else if (/null/.test(match)) {
          themeClass = 'text-gray-400';
        }
        return '<span class="' + themeClass + '">' + match + '</span>';
      }
    );

    /**
     * Regex for the start of the line, insert a number-line themeClass tag before each line
     */
    return this.showLineNumbers
      ? obj.replace(
        /^/gm,
        () => `<span class="select-none" >${String(line++).padEnd(this.padding)}</span>`
      )
      : obj;
  }

}
