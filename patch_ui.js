const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'Atheleos', 'app', '(main)', 'messages', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const newUI = `    const renderCallOverlay = () => {
        if (!isCalling && !callAccepted && !receivingCall) return null;
        
        // Incoming Call Modal
        if (receivingCall && !callAccepted) {
             return (
                 <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center animate-fade-in">
                     <div className="flex flex-col items-center max-w-sm w-full p-8 text-center">
                         {/* Pulsing Avatar */}
                         <div className="relative mb-8">
                             <div className="absolute inset-0 bg-accent-primary/20 rounded-full animate-ping"></div>
                             <div className="absolute inset-2 bg-accent-primary/40 rounded-full animate-pulse mt-2 ml-2 w-[112px] h-[112px]"></div>
                             <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 mx-auto shadow-2xl">
                                  <Image src={callerAvatar || \`https://ui-avatars.com/api/?name=\${callerName}&background=random\`} alt={callerName} width={128} height={128} className="w-full h-full object-cover" />
                             </div>
                         </div>
                         <h2 className="text-3xl font-bold text-white mb-2">{callerName}</h2>
                         <p className="text-accent-primary font-medium tracking-wide mb-12 animate-pulse">
                             {isVideoCall ? "Incoming Video Call..." : "Incoming Audio Call..."}
                         </p>
                         
                         {/* Action Buttons */}
                         <div className="flex items-center justify-center gap-8 w-full">
                             <button onClick={() => { setReceivingCall(false); socket?.emit("end_call", { to: caller }); }} className="flex flex-col items-center gap-3 group">
                                 <div className="w-16 h-16 bg-red-500/20 group-hover:bg-red-500 rounded-full flex items-center justify-center text-red-500 group-hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18v1.5h3v-1.5m-3 0h3" /></svg>
                                 </div>
                                 <span className="text-white/60 text-sm font-medium">Decline</span>
                             </button>

                             <button onClick={answerCall} className="flex flex-col items-center gap-3 group">
                                 <div className="w-16 h-16 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-bounce [animation-duration:2s]">
                                    {isVideoCall ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" /></svg>
                                    )}
                                 </div>
                                 <span className="text-white/90 text-sm font-medium">Accept</span>
                             </button>
                         </div>
                     </div>
                 </div>
             );
        }

        // Active Call / Calling Modal
        return (
            <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-fade-in relative overflow-hidden">
                {/* Background Layer: Remote Video or Calling State */}
                {callAccepted && remoteStream ? (
                    isVideoCall ? (
                       <video playsInline ref={userVideo} autoPlay className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 w-full h-full">
                           <div className="relative mb-6">
                               <div className="absolute inset-0 bg-accent-primary/10 rounded-full animate-ping"></div>
                               <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/5 relative z-10 shadow-2xl bg-black">
                                    <Image src={activeConversation?.avatar_url || \`https://ui-avatars.com/api/?name=\${activeConversation?.username}&background=random\`} alt="Avatar" width={128} height={128} className="w-full h-full object-cover" />
                               </div>
                           </div>
                           <h2 className="text-3xl font-bold text-white tracking-widest bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Audio Call In Progress</h2>
                           <audio playsInline ref={userVideo} autoPlay />
                       </div>
                    )
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-gray-900 w-full h-full">
                         <div className="relative mb-8">
                             <div className="absolute inset-0 bg-white/5 rounded-full animate-ping"></div>
                             <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden mx-auto border-4 border-white/10 relative z-10 shadow-2xl bg-black">
                                  <Image src={activeConversation?.avatar_url || \`https://ui-avatars.com/api/?name=\${activeConversation?.username}&background=random\`} alt="Avatar" width={144} height={144} className="w-full h-full object-cover" />
                             </div>
                         </div>
                         <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">{activeConversation?.full_name || activeConversation?.username}</h2>
                         <p className="text-accent-primary text-lg font-medium tracking-widest animate-pulse">Ringing...</p>
                    </div>
                )}

                {/* Local Video Picture-in-Picture */}
                {localStream && isVideoCall && (
                    <div className={\`absolute transition-all duration-500 ease-in-out \${callAccepted ? 'top-6 right-6 sm:top-8 sm:right-8 w-28 h-40 sm:w-48 sm:h-72 border-2 border-white/20 rounded-2xl shadow-2xl shrink-0' : 'inset-0 w-full h-full opacity-30 blur-2xl'} overflow-hidden bg-black z-10 pointer-events-none\`}>
                        <video playsInline muted ref={myVideo} autoPlay className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Glassmorphic Controls Dock */}
                <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center p-3 sm:p-4 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] gap-4 sm:gap-6 pointer-events-auto">
                    {isVideoCall && (
                        <button onClick={toggleVideo} className={\`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg \${isVideoOff ? 'bg-white/20 text-white/50 hover:bg-white/30' : 'bg-white/10 hover:bg-white/20'}\`}>
                            {isVideoOff ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                            )}
                        </button>
                    )}
                    
                    <button onClick={leaveCall} className="w-14 h-14 sm:w-16 sm:h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:scale-105 active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8"><path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18v1.5h3v-1.5m-3 0h3" /></svg>
                    </button>
                    
                    <button onClick={toggleMute} className={\`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg \${isMuted ? 'bg-white/20 text-white/50 hover:bg-white/30' : 'bg-white/10 hover:bg-white/20'}\`}>
                        {isMuted ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.99 18.25c-.246 0-.495-.018-.742-.051m4.332-1.785a8.25 8.25 0 0 0-6.19-20.916m3.929 1.839 1.447 1.446M5.895 5.895A8.25 8.25 0 0 0 12 18.25v2.25M17.657 6.343l-1.445 1.446M2.25 2.25l19.5 19.5" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" /></svg>
                        )}
                    </button>
                </div>
            </div>
        );
    };`;

const startIdx = content.indexOf('    const renderCallOverlay = () => {');
const endIdx = content.indexOf('    // ─── Filtered Conversations ────────────────────');

if (startIdx === -1 || endIdx === -1) {
    console.error('Failed to find start or end index for replacement.');
    process.exit(1);
}

content = content.slice(0, startIdx) + newUI + '\\n\\n' + content.slice(endIdx);
fs.writeFileSync(filePath, content);
console.log('Successfully applied new Glassmorphic Phone UI patch string!');
