(() => {
  // ns-hugo:C:\Users\sjucc\Documents\git\stjohnsucc.github.io\themes\hugo-liftoff\assets\js\components\switchTheme.js
  function switchTheme() {
    let themeSwitch = document.getElementById("themeSwitch");
    if (themeSwitch) {
      let initTheme = function() {
        let lsItem = localStorage.getItem("themeSwitch");
        let darkThemeSelected = false;
        if (lsItem !== null) {
          darkThemeSelected = lsItem === "dark";
        } else {
          darkThemeSelected = window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        themeSwitch.checked = darkThemeSelected;
        resetTheme();
      }, resetTheme = function() {
        if (themeSwitch.checked) {
          document.body.setAttribute("data-theme", "dark");
          localStorage.setItem("themeSwitch", "dark");
        } else {
          document.body.removeAttribute("data-theme");
          localStorage.setItem("themeSwitch", "light");
        }
        if (typeof DISQUS !== "undefined") {
          DISQUS.reset({ reload: true });
        }
      };
      initTheme();
      themeSwitch.addEventListener("change", () => {
        resetTheme();
      });
    }
  }
  var switcher = (() => {
    switchTheme();
  })();

  // ns-hugo:C:\Users\sjucc\Documents\git\stjohnsucc.github.io\themes\hugo-liftoff\assets\js\components\clipboard.js
  var addCopyButtons = (clipboard2) => {
    document.querySelectorAll(".highlight > pre > code").forEach((codeBlock) => {
      const button = document.createElement("button");
      const svgCopy = '<svg role="img" aria-hidden="true" aria-labelledby="clipboardCopy" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><title id="clipboardCopy">Copy the code snippet contents</title><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
      const svgCheck = '<svg role="img" aria-hidden="true" aria-labelledby="clipboardCheckmark" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><title id="clipboardCheckmark">Code snippet contents copied</title><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
      button.className = "clipboard-button";
      button.type = "button";
      button.innerHTML = svgCopy;
      button.addEventListener("click", () => {
        let textToCopy = "";
        let codeBlockChildren = Array.from(codeBlock.children);
        codeBlockChildren.forEach(function(span) {
          textToCopy += span.lastChild.innerText;
        });
        clipboard2.writeText(textToCopy).then(
          () => {
            button.blur();
            button.innerHTML = svgCheck;
            setTimeout(() => button.innerHTML = svgCopy, 2e3);
          },
          (error) => button.innerHTML = "Error"
        );
      });
      const pre = codeBlock.parentNode;
      pre.parentNode.insertBefore(button, pre);
    });
  };
  var clipboard = (() => {
    if (navigator && navigator.clipboard) {
      addCopyButtons(navigator.clipboard);
    }
  })();

  // ns-hugo:C:\Users\sjucc\Documents\git\stjohnsucc.github.io\themes\hugo-liftoff\assets\js\components\toc.js
  var toggleToc = (() => {
    let tocToggle = document.getElementById("js-toc-toggle");
    let tocContents = document.getElementById("js-toc-contents");
    if (tocToggle) {
      tocToggle.addEventListener("click", () => {
        tocContents.classList.toggle("toc-contents--active");
      });
    }
  })();

  // ns-hugo:C:\Users\sjucc\Documents\git\stjohnsucc.github.io\themes\hugo-liftoff\assets\js\layouts\header.js
  function toggleNav() {
    let mainMenu = document.getElementById("js-menu");
    let navBarToggle = document.getElementById("js-navbar-toggle");
    navBarToggle.addEventListener("click", () => {
      mainMenu.classList.toggle("menu--active");
      removeSubMenus();
    });
  }
  function toggleMobileMenu() {
    let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(function(item) {
      item.addEventListener("click", () => {
        let subMenu = item.querySelector(".sub-menu");
        if (subMenu.classList.contains("sub-menu--active")) {
          subMenu.classList.remove("sub-menu--active");
        } else {
          removeSubMenus();
          subMenu.classList.add("sub-menu--active");
        }
      });
    });
  }
  function removeSubMenus() {
    let subMenus = document.querySelectorAll(".sub-menu");
    subMenus.forEach(function(sub) {
      if (sub.classList.contains("sub-menu--active")) {
        sub.classList.remove("sub-menu--active");
      }
    });
  }
  var header = (() => {
    toggleNav();
    toggleMobileMenu();
  })();

  // ns-hugo:C:\Users\sjucc\Documents\git\stjohnsucc.github.io\themes\hugo-liftoff\assets\js\pages\home.js
  function filterPosts() {
    let selectPosts = document.getElementById("select-posts");
    let entries = document.querySelectorAll(".post-entry-filter");
    if (selectPosts) {
      selectPosts.addEventListener("change", () => {
        entries.forEach(function(entry) {
          if (entry.classList.contains(`entry--${selectPosts.value}`) | selectPosts.value === "all-posts") {
            entry.style.display = "block";
          } else {
            entry.style.display = "none";
          }
        });
      });
    }
  }
  var home = (() => {
    filterPosts();
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnbzpDOlxcVXNlcnNcXHNqdWNjXFxEb2N1bWVudHNcXGdpdFxcc3Rqb2huc3VjYy5naXRodWIuaW9cXHRoZW1lc1xcaHVnby1saWZ0b2ZmXFxhc3NldHNcXGpzXFxjb21wb25lbnRzXFxzd2l0Y2hUaGVtZS5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc2p1Y2NcXERvY3VtZW50c1xcZ2l0XFxzdGpvaG5zdWNjLmdpdGh1Yi5pb1xcdGhlbWVzXFxodWdvLWxpZnRvZmZcXGFzc2V0c1xcanNcXGNvbXBvbmVudHNcXGNsaXBib2FyZC5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc2p1Y2NcXERvY3VtZW50c1xcZ2l0XFxzdGpvaG5zdWNjLmdpdGh1Yi5pb1xcdGhlbWVzXFxodWdvLWxpZnRvZmZcXGFzc2V0c1xcanNcXGNvbXBvbmVudHNcXHRvYy5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc2p1Y2NcXERvY3VtZW50c1xcZ2l0XFxzdGpvaG5zdWNjLmdpdGh1Yi5pb1xcdGhlbWVzXFxodWdvLWxpZnRvZmZcXGFzc2V0c1xcanNcXGxheW91dHNcXGhlYWRlci5qcyIsICJucy1odWdvOkM6XFxVc2Vyc1xcc2p1Y2NcXERvY3VtZW50c1xcZ2l0XFxzdGpvaG5zdWNjLmdpdGh1Yi5pb1xcdGhlbWVzXFxodWdvLWxpZnRvZmZcXGFzc2V0c1xcanNcXHBhZ2VzXFxob21lLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL0NvZHlIb3VzZS9kYXJrLWxpZ2h0LW1vZGUtc3dpdGNoXHJcblxyXG5mdW5jdGlvbiBzd2l0Y2hUaGVtZSgpIHtcclxuICBsZXQgdGhlbWVTd2l0Y2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWVTd2l0Y2gnKTtcclxuICBpZiAodGhlbWVTd2l0Y2gpIHtcclxuICAgIGluaXRUaGVtZSgpO1xyXG5cclxuICAgIHRoZW1lU3dpdGNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgcmVzZXRUaGVtZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFRoZW1lKCkge1xyXG4gICAgICBsZXQgbHNJdGVtID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RoZW1lU3dpdGNoJyk7XHJcbiAgICAgIGxldCBkYXJrVGhlbWVTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAobHNJdGVtICE9PSBudWxsKSB7XHJcbiAgICAgICAgZGFya1RoZW1lU2VsZWN0ZWQgPSBsc0l0ZW0gPT09ICdkYXJrJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkYXJrVGhlbWVTZWxlY3RlZCA9IHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlcztcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhlbWVTd2l0Y2guY2hlY2tlZCA9IGRhcmtUaGVtZVNlbGVjdGVkO1xyXG4gICAgICByZXNldFRoZW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRUaGVtZSgpIHtcclxuICAgICAgaWYgKHRoZW1lU3dpdGNoLmNoZWNrZWQpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICdkYXJrJyk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lU3dpdGNoJywgJ2RhcmsnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10aGVtZScpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aGVtZVN3aXRjaCcsICdsaWdodCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBSZXNldCBEaXNxdXMgdG8gbWF0Y2ggbmV3IGNvbG9yIHNjaGVtZVxyXG4gICAgICBpZiAodHlwZW9mIERJU1FVUyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgRElTUVVTLnJlc2V0KHsgcmVsb2FkOiB0cnVlIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzd2l0Y2hlciA9ICgoKSA9PiB7XHJcbiAgc3dpdGNoVGhlbWUoKTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IHN3aXRjaGVyIH07IiwgIi8vIEFkYXB0ZWQgZnJvbSB0aGUgZm9sbG93aW5nIHR1dG9yaWFsczpcclxuLy8gaHR0cHM6Ly93d3cuZGFubnlndW8uY29tL2Jsb2cvaG93LXRvLWFkZC1jb3B5LXRvLWNsaXBib2FyZC1idXR0b25zLXRvLWNvZGUtYmxvY2tzLWluLWh1Z28vXHJcbi8vIGh0dHBzOi8vYWFyb25sdW5hLmRldi9ibG9nL2FkZC1jb3B5LWJ1dHRvbi10by1jb2RlLWJsb2Nrcy1odWdvLWNocm9tYS9cclxuLy8gaHR0cHM6Ly9sb2dmZXRjaC5jb20vaHVnby1hZGQtY29weS10by1jbGlwYm9hcmQtYnV0dG9uL1xyXG5cclxuY29uc3QgYWRkQ29weUJ1dHRvbnMgPSAoY2xpcGJvYXJkKSA9PiB7XHJcbiAgLy8gMS4gTG9vayBmb3IgcHJlID4gY29kZSBlbGVtZW50cyBpbiB0aGUgRE9NXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhpZ2hsaWdodCA+IHByZSA+IGNvZGUnKS5mb3JFYWNoKChjb2RlQmxvY2spID0+IHtcclxuICAgIC8vIDIuIENyZWF0ZSBhIGJ1dHRvbiB0aGF0IHdpbGwgdHJpZ2dlciBhIGNvcHkgb3BlcmF0aW9uXHJcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IHN2Z0NvcHkgPSAnPHN2ZyByb2xlPVwiaW1nXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY2xpcGJvYXJkQ29weVwiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjE2XCIgZGF0YS12aWV3LWNvbXBvbmVudD1cInRydWVcIj48dGl0bGUgaWQ9XCJjbGlwYm9hcmRDb3B5XCI+Q29weSB0aGUgY29kZSBzbmlwcGV0IGNvbnRlbnRzPC90aXRsZT48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0wIDYuNzVDMCA1Ljc4NC43ODQgNSAxLjc1IDVoMS41YS43NS43NSAwIDAxMCAxLjVoLTEuNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtMS41YS43NS43NSAwIDAxMS41IDB2MS41QTEuNzUgMS43NSAwIDAxOS4yNSAxNmgtNy41QTEuNzUgMS43NSAwIDAxMCAxNC4yNXYtNy41elwiPjwvcGF0aD48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk01IDEuNzVDNSAuNzg0IDUuNzg0IDAgNi43NSAwaDcuNUMxNS4yMTYgMCAxNiAuNzg0IDE2IDEuNzV2Ny41QTEuNzUgMS43NSAwIDAxMTQuMjUgMTFoLTcuNUExLjc1IDEuNzUgMCAwMTUgOS4yNXYtNy41em0xLjc1LS4yNWEuMjUuMjUgMCAwMC0uMjUuMjV2Ny41YzAgLjEzOC4xMTIuMjUuMjUuMjVoNy41YS4yNS4yNSAwIDAwLjI1LS4yNXYtNy41YS4yNS4yNSAwIDAwLS4yNS0uMjVoLTcuNXpcIj48L3BhdGg+PC9zdmc+JztcclxuICAgIGNvbnN0IHN2Z0NoZWNrID0gJzxzdmcgcm9sZT1cImltZ1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGFyaWEtbGFiZWxsZWRieT1cImNsaXBib2FyZENoZWNrbWFya1wiIGhlaWdodD1cIjE2XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIHZlcnNpb249XCIxLjFcIiB3aWR0aD1cIjE2XCIgZGF0YS12aWV3LWNvbXBvbmVudD1cInRydWVcIj48dGl0bGUgaWQ9XCJjbGlwYm9hcmRDaGVja21hcmtcIj5Db2RlIHNuaXBwZXQgY29udGVudHMgY29waWVkPC90aXRsZT48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZmlsbD1cInJnYig2MywgMTg1LCA4MClcIiBkPVwiTTEzLjc4IDQuMjJhLjc1Ljc1IDAgMDEwIDEuMDZsLTcuMjUgNy4yNWEuNzUuNzUgMCAwMS0xLjA2IDBMMi4yMiA5LjI4YS43NS43NSAwIDAxMS4wNi0xLjA2TDYgMTAuOTRsNi43Mi02LjcyYS43NS43NSAwIDAxMS4wNiAwelwiPjwvcGF0aD48L3N2Zz4nO1xyXG4gICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdjbGlwYm9hcmQtYnV0dG9uJztcclxuICAgIGJ1dHRvbi50eXBlID0gJ2J1dHRvbic7XHJcbiAgICBidXR0b24uaW5uZXJIVE1MID0gc3ZnQ29weTtcclxuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IHRleHRUb0NvcHkgPSAnJztcclxuICAgICAgbGV0IGNvZGVCbG9ja0NoaWxkcmVuID0gQXJyYXkuZnJvbShjb2RlQmxvY2suY2hpbGRyZW4pXHJcbiAgICAgIGNvZGVCbG9ja0NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oc3Bhbikge1xyXG4gICAgICAgIC8vIGxhc3RDaGlsZCBpcyByZXF1aXJlZCB0byBhdm9pZCBjb3B5aW5nIGxpbmUgbnVtYmVyc1xyXG4gICAgICAgIHRleHRUb0NvcHkgKz0gc3Bhbi5sYXN0Q2hpbGQuaW5uZXJUZXh0O1xyXG4gICAgICB9KTtcclxuICAgICAgY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0VG9Db3B5KS50aGVuKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIGJ1dHRvbi5ibHVyKCk7XHJcbiAgICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gc3ZnQ2hlY2s7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IChidXR0b24uaW5uZXJIVE1MID0gc3ZnQ29weSksIDIwMDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiAoYnV0dG9uLmlubmVySFRNTCA9ICdFcnJvcicpXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICAgIC8vIDMuIEFwcGVuZCB0aGUgYnV0dG9uIGRpcmVjdGx5IGJlZm9yZSB0aGUgcHJlIHRhZ1xyXG4gICAgY29uc3QgcHJlID0gY29kZUJsb2NrLnBhcmVudE5vZGU7XHJcbiAgICBwcmUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYnV0dG9uLCBwcmUpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgY2xpcGJvYXJkID0gKCgpID0+IHtcclxuICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5jbGlwYm9hcmQpIHtcclxuICAgIGFkZENvcHlCdXR0b25zKG5hdmlnYXRvci5jbGlwYm9hcmQpO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IGNsaXBib2FyZCB9OyIsICJjb25zdCB0b2dnbGVUb2MgPSAoKCkgPT4ge1xyXG4gIGxldCB0b2NUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtdG9jLXRvZ2dsZScpO1xyXG4gIGxldCB0b2NDb250ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy10b2MtY29udGVudHMnKTtcclxuXHJcbiAgaWYgKHRvY1RvZ2dsZSkge1xyXG4gICAgdG9jVG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0b2NDb250ZW50cy5jbGFzc0xpc3QudG9nZ2xlKCd0b2MtY29udGVudHMtLWFjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgdG9nZ2xlVG9jIH07IiwgIi8vIFNob3cgb3IgaGlkZSBuYXYgb24gY2xpY2sgb2YgbWVudSBidXJnZXJcclxuZnVuY3Rpb24gdG9nZ2xlTmF2KCkge1xyXG4gIGxldCBtYWluTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1tZW51Jyk7XHJcbiAgbGV0IG5hdkJhclRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1uYXZiYXItdG9nZ2xlJyk7XHJcblxyXG4gIG5hdkJhclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIG1haW5NZW51LmNsYXNzTGlzdC50b2dnbGUoJ21lbnUtLWFjdGl2ZScpO1xyXG4gICAgcmVtb3ZlU3ViTWVudXMoKTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gU2hvdyBvciBoaWRlIG1lbnUgaXRlbXMgb24gbW9iaWxlXHJcbmZ1bmN0aW9uIHRvZ2dsZU1vYmlsZU1lbnUoKSB7XHJcbiAgbGV0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWl0ZW0nKTtcclxuXHJcbiAgbWVudUl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IHN1Yk1lbnUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zdWItbWVudScpO1xyXG4gICAgICBpZiAoc3ViTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1tZW51LS1hY3RpdmUnKSkge1xyXG4gICAgICAgIHN1Yk1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnUtLWFjdGl2ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlbW92ZVN1Yk1lbnVzKCk7XHJcbiAgICAgICAgc3ViTWVudS5jbGFzc0xpc3QuYWRkKCdzdWItbWVudS0tYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBDb2xsYXBzZSBzdWJtZW51c1xyXG5mdW5jdGlvbiByZW1vdmVTdWJNZW51cygpIHtcclxuICBsZXQgc3ViTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3ViLW1lbnUnKTtcclxuICBzdWJNZW51cy5mb3JFYWNoKGZ1bmN0aW9uKHN1Yikge1xyXG4gICAgaWYgKHN1Yi5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Yi1tZW51LS1hY3RpdmUnKSkge1xyXG4gICAgICBzdWIuY2xhc3NMaXN0LnJlbW92ZSgnc3ViLW1lbnUtLWFjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCBoZWFkZXIgPSAoKCkgPT4ge1xyXG4gIHRvZ2dsZU5hdigpO1xyXG4gIHRvZ2dsZU1vYmlsZU1lbnUoKTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCB7IGhlYWRlciB9OyIsICJmdW5jdGlvbiBmaWx0ZXJQb3N0cygpIHtcclxuICBsZXQgc2VsZWN0UG9zdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LXBvc3RzJyk7XHJcbiAgbGV0IGVudHJpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9zdC1lbnRyeS1maWx0ZXInKTtcclxuICBpZiAoc2VsZWN0UG9zdHMpIHtcclxuICAgIHNlbGVjdFBvc3RzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICAgICAgaWYgKGVudHJ5LmNsYXNzTGlzdC5jb250YWlucyhgZW50cnktLSR7c2VsZWN0UG9zdHMudmFsdWV9YCkgfCBzZWxlY3RQb3N0cy52YWx1ZSA9PT0gJ2FsbC1wb3N0cycpIHtcclxuICAgICAgICAgIGVudHJ5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbnRyeS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGhvbWUgPSAoKCkgPT4ge1xyXG4gIGZpbHRlclBvc3RzKCk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgeyBob21lIH07Il0sCiAgIm1hcHBpbmdzIjogIjs7QUFFQSxXQUFTLGNBQWM7QUFDckIsUUFBSSxjQUFjLFNBQVMsZUFBZSxhQUFh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
