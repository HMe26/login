
        // ============================================================
        // LECTURE DATA - Replace URLs with your actual audio files
        // ============================================================
      const lectures = [
  {
    title: "Lecture 1",
    audios: [
      { label: "Introduction", url: "../lect1/Lec 1 Introduction .m4a" },
      { label: "Horse Behavior", url: "../lect1/Lec 1 Horse Behavior (1).m4a" },

      { label: "Cattle Part 1", url: "../lect1/Lec 1 Cattle Part 1.m4a" },
      { label: "Cattle Part 2", url: "../lect1/Lec 1 Cattle Part 2.m4a" },
      { label: "Cattle Part 3", url: "../lect1/Lec 1 Cattle Part 3.m4a" },
      { label: "Cattle Part 4", url: "../lect1/Lec 1 Cattle Part 4.m4a" },
      { label: "Cattle Part 5", url: "../lect1/Lec 1 Cattle Part 5.m4a" },
    ],
  },
  {
    title: "Lecture 2",
    audios: [
      {
        label: "Lec 2 Introduction",
        url: "../lect2/Lec 2 Introduction  (1).m4a",
      },
      { label: "Part 1", url: "../lect2/Lec 2 Cattle Part 1.m4a" },
      { label: "Part 2", url: "../lect2/Lec 2 Cattle Part 2.mp3" },
      { label: "Part 3", url: "../lect2/Lec 2 Cattle part 3.m4a" },
      { label: "Horse Behavior", url: "./lect2/Lec 2 Horse Behavior.m4a" },
    ],
  },
  {
    title: "Lecture 3",
    audios: [
      {
        label: "Lec 3 Introduction",
        url: "./lect3/Lec 3 Introduction (1).m4a",
      },
      { label: "Part 2", url: "../lect3/Lec 3 Cattle Part 1.m4a" },
      { label: "Part 2", url: "../lect3/Lec 3 Cattle Part 2 (1).m4a" },
    ],
  },
  {
    title: "Lecture 4",
    audios: [
      { label: "Lec 4 Behavior", url: "../lect4/Lec 4 Behavior Part 1.m4a" },
      { label: "Part 2", url: "../lect4/Lec 4 Cattle Part 2.m4a" },

      { label: "Part 2", url: "../lect4/Lec 4 Cattle Part 2.m4a" },
    ],
  },
  
];


        // ============================================================
        // PDF DOCUMENTS DATA - Add your PDF files here
        // ============================================================
        const pdfDocuments = [
          {
            title: "Lecture 1 - Introduction to Behavior",
            filename: "lecture_1.pdf",
            url: "../Problem Solving Techniques .pdf",
          
          },
          {
            title: "Lecture 2 - Horse Behavior Analysis",
            filename: "lecture_2.pdf",
            url: "",
          
          },
          {
            title: "Lecture 3 - Cattle Behavior Patterns",
            filename: "lecture_3.pdf",
            url: "./pdfs/lecture_3.pdf",
          
          },
          {
            title: "Lecture 4 - Comprehensive Behavior Study",
            filename: "lecture_4.pdf",
            url: "./pdfs/lecture_4.pdf",
          
          }
        ];

        // Available playback speeds
        const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

        // ============================================================
        // STATE & INITIALIZATION
        // ============================================================
        let currentLecture = null;
        let currentTab = 'audio';

        // Initialize the app when DOM is ready
        document.addEventListener("DOMContentLoaded", () => {
          renderLectureButtons();
          renderPdfDocuments();
          
          // Footer animation
          const footer = document.querySelector(".professional-footer");
          setTimeout(() => {
            footer.classList.add("is-visible");
          }, 200);
        });

        // ============================================================
        // TAB SWITCHING
        // ============================================================
        function switchTab(tab) {
          currentTab = tab;
          
          // Update tab buttons
          document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
          });
          
          if (tab === 'audio') {
            document.getElementById('audioTab').classList.add('active');
            document.getElementById('audioContent').classList.add('active');
            document.getElementById('pdfContent').classList.remove('active');
          } else {
            document.getElementById('pdfTab').classList.add('active');
            document.getElementById('pdfContent').classList.add('active');
            document.getElementById('audioContent').classList.remove('active');
          }
          
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ============================================================
        // RENDER LECTURE BUTTONS
        // ============================================================
        function renderLectureButtons() {
          const buttonsContainer = document.getElementById("lectureButtons");
          buttonsContainer.innerHTML = "";

          lectures.forEach((lecture, index) => {
            const button = document.createElement("button");
            button.className = "lecture-btn";
            button.setAttribute("role", "tab");
            button.setAttribute("aria-selected", "false");
            button.setAttribute("aria-controls", `lecture-panel-${index}`);
            button.setAttribute("id", `lecture-tab-${index}`);
            button.innerHTML = `<span>Lecture ${index + 1}</span>`;

            button.addEventListener("click", () => selectLecture(index));

            button.addEventListener("keydown", (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectLecture(index);
              }
            });

            buttonsContainer.appendChild(button);
          });
        }

        // ============================================================
        // SELECT & DISPLAY LECTURE
        // ============================================================
        function selectLecture(index) {
          currentLecture = index;

          const buttons = document.querySelectorAll(".lecture-btn");
          buttons.forEach((btn, i) => {
            if (i === index) {
              btn.classList.add("active");
              btn.setAttribute("aria-selected", "true");
            } else {
              btn.classList.remove("active");
              btn.setAttribute("aria-selected", "false");
            }
          });

          renderLectureContent(lectures[index], index);
        }

        // ============================================================
        // RENDER LECTURE CONTENT
        // ============================================================
        function renderLectureContent(lecture, index) {
          const contentArea = document.getElementById("contentArea");

          const content = document.createElement("div");
          content.className = "content-area";
          content.setAttribute("role", "tabpanel");
          content.setAttribute("id", `lecture-panel-${index}`);
          content.setAttribute("aria-labelledby", `lecture-tab-${index}`);

          const header = document.createElement("div");
          header.className = "lecture-header";
          header.innerHTML = `
            <h2>${lecture.title}</h2>
            <p>${lecture.audios.length} audio ${lecture.audios.length === 1 ? "file" : "files"} available</p>
          `;
          content.appendChild(header);

          const grid = document.createElement("div");
          grid.className = "audio-grid";

          lecture.audios.forEach((audio, audioIndex) => {
            const card = createAudioCard(audio, audioIndex);
            grid.appendChild(card);
          });

          content.appendChild(grid);

          contentArea.innerHTML = "";
          contentArea.appendChild(content);

          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // ============================================================
        // CREATE AUDIO CARD
        // ============================================================
        function createAudioCard(audio, index) {
          const card = document.createElement("div");
          card.className = "audio-card";
          card.setAttribute("role", "region");
          card.setAttribute("aria-label", `Audio: ${audio.label}`);

          const cardHeader = document.createElement("div");
          cardHeader.className = "audio-card-header";
          cardHeader.innerHTML = `
            <h3 class="audio-title">${audio.label}</h3>
            <span class="audio-duration" id="duration-${currentLecture}-${index}">--:--</span>
          `;
          card.appendChild(cardHeader);

          const audioPlayer = document.createElement("audio");
          audioPlayer.className = "audio-player";
          audioPlayer.controls = true;
          audioPlayer.preload = "metadata";
          audioPlayer.id = `audio-player-${currentLecture}-${index}`;
          audioPlayer.setAttribute("aria-label", `Audio player for ${audio.label}`);

          const source = document.createElement("source");
          source.src = audio.url;
          source.type = "audio/mpeg";
          audioPlayer.appendChild(source);

          audioPlayer.innerHTML += "Your browser does not support the audio element.";

          audioPlayer.addEventListener("loadedmetadata", () => {
            const duration = formatDuration(audioPlayer.duration);
            document.getElementById(`duration-${currentLecture}-${index}`).textContent = duration;
          });

          audioPlayer.addEventListener("error", () => {
            const errorMsg = document.createElement("div");
            errorMsg.className = "audio-error";
            errorMsg.textContent = "⚠️ Unable to load audio file. Please check the URL.";
            errorMsg.setAttribute("role", "alert");
            card.appendChild(errorMsg);
          });

          card.appendChild(audioPlayer);

          const speedControls = createSpeedControls(audioPlayer, currentLecture, index);
          card.appendChild(speedControls);

          const downloadBtn = createDownloadButton(audio, audioPlayer);
          card.appendChild(downloadBtn);

          return card;
        }

        // ============================================================
        // CREATE SPEED CONTROLS
        // ============================================================
        function createSpeedControls(audioPlayer, lectureIndex, audioIndex) {
          const controlsContainer = document.createElement("div");
          controlsContainer.className = "speed-controls";

          const label = document.createElement("span");
          label.className = "speed-label";
          label.textContent = "Playback Speed:";
          controlsContainer.appendChild(label);

          const buttonsContainer = document.createElement("div");
          buttonsContainer.className = "speed-buttons";

          playbackSpeeds.forEach((speed) => {
            const btn = document.createElement("button");
            btn.className = "speed-btn";
            if (speed === 1) {
              btn.classList.add("active");
            }
            btn.textContent = speed === 1 ? "Normal" : `${speed}x`;
            btn.setAttribute("aria-label", `Set playback speed to ${speed}x`);

            btn.addEventListener("click", () => {
              audioPlayer.playbackRate = speed;

              buttonsContainer.querySelectorAll(".speed-btn").forEach((b) => {
                b.classList.remove("active");
              });
              btn.classList.add("active");
            });

            btn.addEventListener("keydown", (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                btn.click();
              }
            });

            buttonsContainer.appendChild(btn);
          });

          controlsContainer.appendChild(buttonsContainer);
          return controlsContainer;
        }

        // ============================================================
        // CREATE DOWNLOAD BUTTON
        // ============================================================
        function createDownloadButton(audio, audioPlayer) {
          const downloadBtn = document.createElement("button");
          downloadBtn.className = "download-btn";
          downloadBtn.setAttribute("aria-label", `Download ${audio.label}`);

          downloadBtn.innerHTML = `
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download Audio</span>
          `;

          downloadBtn.addEventListener("click", async () => {
            try {
              const a = document.createElement("a");
              a.href = audio.url;
              a.download = `${lectures[currentLecture].title}_${audio.label}.mp3`;
              a.style.display = "none";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);

              const originalText = downloadBtn.innerHTML;
              downloadBtn.innerHTML = `
                <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Downloaded!</span>
              `;
              downloadBtn.style.background = "linear-gradient(135deg, var(--success-color), #059669)";

              setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.background = "";
              }, 2000);
            } catch (error) {
              console.error("Download error:", error);
              alert('Unable to download the file. Please try right-clicking the audio player and selecting "Save audio as..."');
            }
          });

          downloadBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              downloadBtn.click();
            }
          });

          return downloadBtn;
        }

        // ============================================================
        // UTILITY FUNCTIONS
        // ============================================================
        function formatDuration(seconds) {
          if (isNaN(seconds) || !isFinite(seconds)) {
            return "--:--";
          }
          const mins = Math.floor(seconds / 60);
          const secs = Math.floor(seconds % 60);
          return `${mins}:${secs.toString().padStart(2, "0")}`;
        }

        // ============================================================
        // PDF FUNCTIONS
        // ============================================================

        // Render PDF Documents
        function renderPdfDocuments() {
          const pdfContentArea = document.getElementById('pdfContentArea');
          
          const header = document.createElement('div');
          header.className = 'lecture-header';
          header.innerHTML = `
            <h2>PDF Documents</h2>
            <p>${pdfDocuments.length} document${pdfDocuments.length === 1 ? '' : 's'} available</p>
          `;
          
          const grid = document.createElement('div');
          grid.className = 'pdf-grid';
          
          pdfDocuments.forEach((pdf, index) => {
            const card = createPdfCard(pdf, index);
            grid.appendChild(card);
          });
          
          pdfContentArea.innerHTML = '';
          pdfContentArea.appendChild(header);
          pdfContentArea.appendChild(grid);
        }

        // Create PDF Card
        function createPdfCard(pdf, index) {
          const card = document.createElement('div');
          card.className = 'pdf-card';
          
          card.innerHTML = `
            <div class="pdf-card-header">
              <div class="pdf-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div class="pdf-info">
                <h3 class="pdf-title">${pdf.title}</h3>
                <div class="pdf-meta">
                  
                </div>
              </div>
            </div>
            
            <div class="pdf-actions">
              <button class="pdf-action-btn btn-view" onclick="viewPdf('${pdf.url}', '${pdf.title}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View
              </button>
              
              <button class="pdf-action-btn btn-download" onclick="downloadPdf('${pdf.url}', '${pdf.filename}')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download
              </button>
            
            </div>
          `;
          
          card.style.animationDelay = `${index * 0.1}s`;
          return card;
        }

        // View PDF in Modal
        function viewPdf(url, title) {
          const modal = document.getElementById('pdfModal');
          const viewer = document.getElementById('pdfViewer');
          const modalTitle = document.getElementById('pdfModalTitle');
          
          modalTitle.textContent = title;
          viewer.src = url;
          modal.classList.add('active');
          
          document.body.style.overflow = 'hidden';
        }

        // Close PDF Modal
        function closePdfModal() {
          const modal = document.getElementById('pdfModal');
          const viewer = document.getElementById('pdfViewer');
          
          modal.classList.remove('active');
          viewer.src = '';
          
          document.body.style.overflow = '';
        }

        // Download PDF
        async function downloadPdf(url, filename) {
          try {
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            showToast('✅ Download started!', 'success');
          } catch (error) {
            console.error('Download error:', error);
            showToast('❌ Download failed. Try again.', 'error');
          }
        }

